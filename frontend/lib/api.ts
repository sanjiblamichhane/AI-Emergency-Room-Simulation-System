// ===================================================================================
// This file contains all the helper functions for communicating with FastAPI backend.
// ===================================================================================

const API_BASE_URL = "http://127.0.0.1:8000"; // Change this for production use

// A generic fetch function to handle all API requests and errors
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Create a more informative error message
      const errorBody = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(`HTTP error! status: ${response.status} - ${errorBody.detail || 'Unknown error'}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API fetch error on endpoint ${endpoint}:`, error);
    throw error;
  }
}

// --- Analytics API Calls ---
export const getKpis = () => apiFetch('/analytics/kpis');
export const getTriageDistribution = () => apiFetch('/analytics/triage_distribution');

// --- Predictive API Calls ---
export const getVolumeForecast = (hours: number = 24) => 
  apiFetch('/predict/volume_forecast', {
    method: 'POST',
    body: JSON.stringify({ hours_to_forecast: hours }),
  });

export const getWaitTimePrediction = (data: {
  Visit_Day: string;
  Shift: string;
  Triage_Level: string;
}) => 
  apiFetch('/predict/wait_time', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const runWaitTimeSimulation = (simData: any) => 
  apiFetch('/predict/wait_time_simulation', {
    method: 'POST',
    body: JSON.stringify(simData),
  });

// --- Operations/Ticket API Calls ---
export const getActiveTickets = () => apiFetch('/tickets');
export const updateTicketStatus = (ticketId: number, status: string) => 
  apiFetch(`/tickets/${ticketId}/status?status=${status}`, { method: 'PUT' });

// --- Feedback API Calls ---
export const submitSurvey = (surveyData: any) =>
  apiFetch('/surveys', {
    method: 'POST',
    body: JSON.stringify(surveyData),
  });