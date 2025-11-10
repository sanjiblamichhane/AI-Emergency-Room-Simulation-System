import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Load the datasets
try:
    # Handle potential BOM character at the start of the file
    visits_df = pd.read_csv('FinalData.csv', encoding='utf-8-sig')
except Exception as e:
    print(f"Could not read visits data: {e}")
    # Fallback if the above fails
    visits_df = pd.read_csv('FinalData.csv')

staffing_df = pd.read_csv('Hospital_Staffing_Cleaned.csv')

# --- Data Cleaning and Feature Engineering ---

# Convert date/time columns to datetime objects
visits_df['Arrival TimeDT'] = pd.to_datetime(visits_df['Arrival TimeDT'], format='%m/%d/%y %H:%M')
staffing_df['Date'] = pd.to_datetime(staffing_df['Date'], format='%m/%d/%Y')

# Extract date part from arrival time to use for merging
visits_df['Arrival_Date'] = visits_df['Arrival TimeDT'].dt.date
staffing_df['Date'] = staffing_df['Date'].dt.date

# The key metric for wait time is 'Arrival_To_DoctorSeen'
wait_time_col = 'Arrival_To_DoctorSeen'

# Merge the two dataframes based on the arrival date and shift
# Note: The 'Arrival_Shift' in visits_df corresponds to 'Shift' in staffing_df
merged_df = pd.merge(
    visits_df,
    staffing_df,
    left_on=['Arrival_Date', 'Arrival_Shift'],
    right_on=['Date', 'Shift'],
    how='left'
)

# Calculate Patient-to-Staff Ratios
# We need to count patients per shift to calculate this ratio
patient_counts = merged_df.groupby(['Date', 'Shift'])['Visit ID'].count().reset_index()
patient_counts.rename(columns={'Visit ID': 'Patient_Volume'}, inplace=True)

merged_df = pd.merge(
    merged_df,
    patient_counts,
    on=['Date', 'Shift'],
    how='left'
)

# Ratios - handle division by zero
merged_df['Patient_To_Doctor_Ratio'] = merged_df['Patient_Volume'] / merged_df['Doctors_On_Duty_Int']
merged_df['Patient_To_Nurse_Ratio'] = merged_df['Patient_Volume'] / merged_df['Nurses_On_Duty_Int']
merged_df.replace([np.inf, -np.inf], np.nan, inplace=True) # Clean up infinities

print("Data preparation complete. Merged dataframe created.")
print(merged_df[[wait_time_col, 'Arrival_Shift', 'Visit_Day', 'Patient_To_Doctor_Ratio', 'Triage Level']].head())