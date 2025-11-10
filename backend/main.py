# ===================================================================================
# main.py - FINAL, FEATURE-COMPLETE VERSION
# ===================================================================================
# This file includes all features:
#   - Predictive Models (Triage, Volume, Wait Time)
#   - Analytics Endpoints (KPIs, Distribution)
#   - Operations (Live Ticket Queue)
#   - "What-If" Simulation for Resource Planning
#
# INSTRUCTIONS:
# 1. Place this file in your backend directory.
# 2. Make sure the following files are in the EXACT SAME directory as this script:
#    - triage_prediction_model.joblib
#    - volume_forecaster_model.joblib
#    - wait_time_model.joblib
#    - FiinalData.csv (or your correct data file name)
#    - Hospital_Staffing_Cleaned.csv
# 3. Run the server from this directory using: uvicorn main:app --reload
# ===================================================================================

import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from typing import Literal, List, Optional
from datetime import datetime
import random
import numpy as np

# --- 1. Filepath Configuration (Robust Method) ---
# This ensures that the script can always find its necessary files.
BASE_DIR = Path(__file__).resolve().parent
TRIAGE_MODEL_PATH = BASE_DIR / 'triage_prediction_model.joblib'
VOLUME_MODEL_PATH = BASE_DIR / 'volume_forecaster_model.joblib'
WAIT_TIME_MODEL_PATH = BASE_DIR / 'wait_time_model.joblib'
VISIT_DATA_PATH = BASE_DIR / 'FinalData.csv' 
STAFFING_DATA_PATH = BASE_DIR / 'Hospital_Staffing_Cleaned.csv'

# --- 2. Initialize App and CORS ---
app = FastAPI(
    title="Meridian Hospital ER Predictive & Operations API",
    description="Provides ML models and simulation tools for hospital operations.",
    version="4.0.0" # Final version with simulation
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. Robust Startup Event Handler ---
@app.on_event("startup")
def load_resources():
    print("--- Loading application resources ---")
    
    required_files = [TRIAGE_MODEL_PATH, VOLUME_MODEL_PATH, WAIT_TIME_MODEL_PATH, VISIT_DATA_PATH, STAFFING_DATA_PATH]
    for f_path in required_files:
        if not f_path.exists():
            # This will stop the server from starting and print a clear error in the terminal.
            raise RuntimeError(f"FATAL: Required file not found: {f_path}. Please run train_models.py and ensure all necessary files are in the backend directory.")

    # Load all models and dataframes into the app.state for shared access
    app.state.triage_model = joblib.load(TRIAGE_MODEL_PATH)
    app.state.volume_model = joblib.load(VOLUME_MODEL_PATH)
    app.state.wait_time_model = joblib.load(WAIT_TIME_MODEL_PATH)
    
    df_visits = pd.read_csv(VISIT_DATA_PATH, encoding='utf-8-sig')
    df_visits['Arrival TimeDT'] = pd.to_datetime(df_visits['Arrival TimeDT'], format='%m/%d/%y %H:%M')
    app.state.df_visits = df_visits
    
    df_staffing = pd.read_csv(STAFFING_DATA_PATH)
    df_staffing['Date'] = pd.to_datetime(df_staffing['Date'], format='%m/%d/%Y')
    app.state.df_staffing = df_staffing
    
    print("--- Resources loaded successfully. API is ready. ---")


# --- 4. In-Memory "Database" for Live Ticket Queue ---
db_tickets = [{"id": 1, "queueNumber": 101, "patientName": "John Doe", "triageLevel": 2, "status": "waiting", "issueTime": "2025-11-09 14:05", "estimatedWaitTime": 25, "department": "Emergency Room"}, {"id": 2, "queueNumber": 102, "patientName": "Jane Smith", "triageLevel": 4, "status": "waiting", "issueTime": "2025-11-09 14:10", "estimatedWaitTime": 45, "department": "Emergency Room"}, {"id": 3, "queueNumber": 103, "patientName": "Peter Jones", "triageLevel": 3, "status": "in-service", "issueTime": "2025-11-09 14:12", "estimatedWaitTime": 30, "department": "Emergency Room"}]
next_ticket_id = 4

# --- 5. Pydantic Models for Data Validation ---
class PatientInfo(BaseModel): Age: int; Gender: Literal['Male', 'Female', 'Unknown']; Insurance: Literal['Uninsured', 'Medicare', 'Private']; Arrival_Hour: int; Visit_Day: Literal['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
class ForecastRequest(BaseModel): hours_to_forecast: int = 24
class WaitTimePredictionRequest(BaseModel): Visit_Day: Literal['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; Shift: Literal['Day', 'Evening', 'Night']; Triage_Level: Literal['Immediate', 'Emergency', 'Urgent', 'Semi-Urgent']
class SimulationRequest(BaseModel): 
    Visit_Day: Literal['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    Shift: Literal['Day', 'Evening', 'Night']
    Triage_Level: Literal['Immediate', 'Emergency', 'Urgent', 'Semi-Urgent']
    patient_volume: int
    min_doctors: int
    max_doctors: int
    min_nurses: int
    max_nurses: int
    variable_resource: Literal['doctors', 'nurses']
class SurveySubmission(BaseModel): ratings: dict; wouldRecommend: Optional[bool] = None; comments: Optional[str] = None
class Ticket(BaseModel): id: int; queueNumber: int; patientName: str; department: str; triageLevel: int; status: Literal["waiting", "called", "in-service", "completed"]; issueTime: str; estimatedWaitTime: int
class TicketCreate(BaseModel): patientName: str; department: str = "Emergency Room"; triageLevel: int

# --- 6. API Endpoints ---
@app.get("/")
def read_root(): return {"message": "Meridian ER API is running."}

@app.post("/predict/triage")
def predict_triage(request: Request, patient_info: PatientInfo):
    model = request.app.state.triage_model; input_df = pd.DataFrame([patient_info.model_dump()]); prediction = model.predict(input_df)[0]; probabilities = model.predict_proba(input_df); confidence = probabilities.max(); triage_map = {1: "Immediate", 2: "Emergency", 3: "Urgent", 4: "Semi-Urgent"}
    return {"suggested_triage_level_standard": int(prediction), "suggested_triage_level_name": triage_map.get(int(prediction), "Unknown"), "confidence": f"{confidence:.2%}"}

@app.post("/predict/volume_forecast")
def predict_volume_forecast(request: Request, forecast_req: ForecastRequest):
    model = request.app.state.volume_model; forecast = model.get_forecast(steps=forecast_req.hours_to_forecast); predicted_volume = forecast.predicted_mean
    return [{"time": pd.to_datetime(ts).strftime('%H:%M'), "patients": round(vol)} for ts, vol in predicted_volume.items()]

@app.post("/predict/wait_time")
def predict_wait_time(request: Request, data: WaitTimePredictionRequest):
    df_staffing = request.app.state.df_staffing; today = datetime.now().date(); staff_info = df_staffing[(df_staffing['Date'].dt.date == today) & (df_staffing['Shift'] == data.Shift)]
    if staff_info.empty:
        nurses = df_staffing[df_staffing['Shift'] == data.Shift]['Nurses_On_Duty_Int'].mean()
        doctors = df_staffing[df_staffing['Shift'] == data.Shift]['Doctors_On_Duty_Int'].mean()
    else:
        nurses = staff_info.iloc[0]['Nurses_On_Duty_Int']; doctors = staff_info.iloc[0]['Doctors_On_Duty_Int']
    model_input = {'Visit_Day': data.Visit_Day, 'Shift': data.Shift, 'Triage Level': data.Triage_Level, 'Nurses_On_Duty_Int': nurses, 'Doctors_On_Duty_Int': doctors}; input_df = pd.DataFrame([model_input]); model = request.app.state.wait_time_model; prediction = model.predict(input_df)[0]; predicted_wait = round(prediction)
    return {"predicted_wait_time_min": predicted_wait, "prediction_range": f"{max(0, predicted_wait-10)} - {predicted_wait+10} min"}

@app.post("/predict/wait_time_simulation")
def predict_wait_time_simulation(request: Request, sim_data: SimulationRequest):
    model = request.app.state.wait_time_model; results = []
    if sim_data.variable_resource == 'doctors':
        resource_range = range(sim_data.min_doctors, sim_data.max_doctors + 1); fixed_nurses = round((sim_data.min_nurses + sim_data.max_nurses) / 2)
    else:
        resource_range = range(sim_data.min_nurses, sim_data.max_nurses + 1); fixed_doctors = round((sim_data.min_doctors + sim_data.max_doctors) / 2)
    simulation_inputs = []
    for resource_count in resource_range:
        simulation_inputs.append({
            'Visit_Day': sim_data.Visit_Day,
            'Shift': sim_data.Shift,
            'Triage Level': sim_data.Triage_Level,
            'Nurses_On_Duty_Int': fixed_nurses if sim_data.variable_resource == 'doctors' else resource_count,
            'Doctors_On_Duty_Int': resource_count if sim_data.variable_resource == 'doctors' else fixed_doctors,
            'Patient_Volume_Per_Shift': sim_data.patient_volume
        })
    input_df = pd.DataFrame(simulation_inputs)
    predictions = model.predict(input_df)
    for i, resource_count in enumerate(resource_range):
        results.append({
            'resource_count': resource_count,
            'predicted_wait': round(predictions[i])
        })
    return results

@app.get("/analytics/kpis")
def get_kpis(request: Request):
    df = request.app.state.df_visits; return {"totalPatients": len(df['Patient ID'].unique()), "avgWaitTime": round(df['Arrival_To_DoctorSeen'].mean()), "bedOccupancy": 85, "approvalRating": 78, "avgLengthOfStay": round(df['Total_ER_Time_Min'].mean() / 60, 1)}

@app.get("/analytics/triage_distribution")
def get_triage_distribution(request: Request):
    df = request.app.state.df_visits; distribution = df['Triage Level'].value_counts(); total_visits = len(df); triage_levels = ["Immediate", "Emergency", "Urgent", "Semi-Urgent"]; return [{"level": level, "count": int(distribution.get(level, 0)), "percentage": round((distribution.get(level, 0) / total_visits) * 100)} for level in triage_levels]

@app.get("/tickets", response_model=List[Ticket])
def get_active_tickets(): return [ticket for ticket in db_tickets if ticket["status"] != "completed"]

@app.post("/tickets", response_model=Ticket, status_code=201)
def issue_new_ticket(ticket_data: TicketCreate):
    global next_ticket_id; new_ticket = Ticket(id=next_ticket_id, queueNumber=max((t['queueNumber'] for t in db_tickets), default=100) + 1, patientName=ticket_data.patientName, department=ticket_data.department, triageLevel=ticket_data.triageLevel, status="waiting", issueTime=datetime.now().strftime("%Y-%m-%d %H:%M"), estimatedWaitTime=random.randint(15, 60)); db_tickets.append(new_ticket.model_dump()); next_ticket_id += 1; return new_ticket

@app.put("/tickets/{ticket_id}/status", response_model=Ticket)
def update_ticket_status(ticket_id: int, status: Literal["waiting", "called", "in-service", "completed"]):
    for ticket in db_tickets:
        if ticket["id"] == ticket_id: ticket["status"] = status; return ticket
    raise HTTPException(status_code=44, detail=f"Ticket with ID {ticket_id} not found")

@app.post("/surveys")
def submit_survey(submission: SurveySubmission):
    print("--- New Survey Submission Received ---"); print(submission.model_dump_json(indent=2)); print("--------------------------------------"); return {"message": "Thank you for your feedback!"}