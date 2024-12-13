import pandas as pd
from datetime import datetime

# Load the CSV file
input_file = 'transactions.csv'  # Replace with your file name
output_file = 'transactions_converted.csv'

# Read the CSV and convert the date format
df = pd.read_csv(input_file)

# Function to convert dates and handle missing/invalid dates
def convert_to_iso(date_str):
    try:
        # Attempt to parse the date in DD/MM/YYYY HH:mm:ss format
        return pd.to_datetime(date_str, format='%d/%m/%Y %H:%M:%S').strftime('%Y-%m-%dT%H:%M:%SZ')
    except:
        try:
            # Handle dates without time (DD/MM/YYYY)
            return pd.to_datetime(date_str, format='%d/%m/%Y').strftime('%Y-%m-%dT%H:%M:%SZ')
        except:
            # If parsing fails, return the current date and time
            return datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

# Apply the conversion function to the 'Date' column
df['Date'] = df['Date'].apply(convert_to_iso)

# Save the converted file
df.to_csv(output_file, index=False)

print(f"Date format converted successfully. New file saved as {output_file}.")
