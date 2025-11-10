# ===================================================================================
# train_models.py - FINAL WORKING VERSION (For Simulation Model)
# ===================================================================================
# This version updates the wait time model to include Patient Volume as a feature,
# making the "what-if" simulation much more accurate.
# ===================================================================================

import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import statsmodels.api as sm
from pathlib import Path

# --- CONFIGURATION ---
BASE_DIR = Path(__file__).resolve().parent
VISIT_DATA_PATH = BASE_DIR / 'FinalData.csv' 
STAFFING_DATA_PATH = BASE_DIR / 'Hospital_Staffing_Cleaned.csv'
TRIAGE_MODEL_PATH = BASE_DIR / 'triage_prediction_model.joblib'
VOLUME_MODEL_PATH = BASE_DIR / 'volume_forecaster_model.joblib'
WAIT_TIME_MODEL_PATH = BASE_DIR / 'wait_time_model.joblib'

# --- Model 1: Triage Classifier (No Changes) ---
def train_triage_model():
    print("--- Starting Triage Model Training ---")
    visits_df = pd.read_csv(VISIT_DATA_PATH, encoding='utf-8-sig'); features = ['Age', 'Gender', 'Insurance', 'Arrival_Hour', 'Visit_Day']; target = 'Triage_Level_Standard'; model_df = visits_df[features + [target]].dropna(); X = model_df[features]; y = model_df[target]; categorical_features = ['Gender', 'Insurance', 'Visit_Day']; numerical_features = ['Age', 'Arrival_Hour']; preprocessor = ColumnTransformer(transformers=[('num', 'passthrough', numerical_features), ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)]); model = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))]); print("Fitting the triage model..."); model.fit(X, y); joblib.dump(model, TRIAGE_MODEL_PATH); print(f"✅ Triage model successfully trained and saved to '{TRIAGE_MODEL_PATH}'"); print("-" * 40)

# --- Model 2: Volume Forecaster (No Changes) ---
def train_volume_forecaster():
    print("--- Starting Patient Volume Forecasting Model Training ---")
    df = pd.read_csv(VISIT_DATA_PATH, encoding='utf-8-sig'); df['Arrival TimeDT'] = pd.to_datetime(df['Arrival TimeDT'], format='%m/%d/%y %H:%M'); df.set_index('Arrival TimeDT', inplace=True); hourly_volume = df.resample('h').size().rename('patient_volume'); print("Fitting the SARIMA model... (This may take a minute)"); sarima_model = sm.tsa.statespace.SARIMAX(hourly_volume, order=(1, 1, 1), seasonal_order=(1, 1, 1, 24), enforce_stationarity=False, enforce_invertibility=False).fit(disp=False); joblib.dump(sarima_model, VOLUME_MODEL_PATH); print(f"✅ Volume forecasting model successfully trained and saved to '{VOLUME_MODEL_PATH}'"); print("-" * 40)

# --- Model 3: Wait Time Predictor (UPDATED FOR SIMULATION) ---
def train_wait_time_model():
    """Trains a more advanced wait time prediction model including patient volume."""
    print("--- Starting Advanced Wait Time Prediction Model Training ---")
    
    visits = pd.read_csv(VISIT_DATA_PATH, encoding='utf-8-sig')
    staffing = pd.read_csv(STAFFING_DATA_PATH)
    
    # Prepare for merge
    visits['Arrival TimeDT'] = pd.to_datetime(visits['Arrival TimeDT'], format='%m/%d/%y %H:%M')
    visits['merge_date'] = visits['Arrival TimeDT'].dt.date
    staffing['merge_date'] = pd.to_datetime(staffing['Date'], format='%m/%d/%Y').dt.date
    
    # Calculate patient volume per shift
    patient_volume_per_shift = visits.groupby(['merge_date', 'Arrival_Shift']).size().reset_index(name='Patient_Volume_Per_Shift')
    
    # Merge visits with volume counts
    df_merged = pd.merge(visits, patient_volume_per_shift, on=['merge_date', 'Arrival_Shift'], how='left')
    
    # Merge the result with staffing data
    df = pd.merge(df_merged, staffing, left_on=['merge_date', 'Arrival_Shift'], right_on=['merge_date', 'Shift'], how='left')
    
    # Define features and target
    # *** THIS IS THE KEY CHANGE: Added 'Patient_Volume_Per_Shift' as a feature ***
    features = ['Visit_Day', 'Shift', 'Triage Level', 'Nurses_On_Duty_Int', 'Doctors_On_Duty_Int', 'Patient_Volume_Per_Shift']
    target = 'Arrival_To_DoctorSeen'
    
    df.dropna(subset=features + [target], inplace=True)
    
    X = df[features]
    y = df[target]
    
    # Define preprocessing
    categorical_features = ['Visit_Day', 'Shift', 'Triage Level']
    numerical_features = ['Nurses_On_Duty_Int', 'Doctors_On_Duty_Int', 'Patient_Volume_Per_Shift']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', 'passthrough', numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])
    
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)) # n_jobs=-1 uses all CPU cores
    ])
    
    print("Fitting the advanced wait time regressor model...")
    model.fit(X, y)
    
    joblib.dump(model, WAIT_TIME_MODEL_PATH)
    print(f"✅ Advanced Wait Time model successfully trained and saved to '{WAIT_TIME_MODEL_PATH}'")
    print("-" * 40)

if __name__ == "__main__":
    train_triage_model()
    train_volume_forecaster()
    train_wait_time_model() # Run the new and improved training function
    print("🎉 All models have been trained and saved successfully! 🎉")