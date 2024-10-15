import pandas as pd
import requests
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

# Set up the Nominatim API URL
NOMINATIM_URL = "http://localhost:8088/search"

# Define the data types for specific columns
dtype_dict = {
    12: 'str',  # Replace with actual column names if needed
    40: 'str',
    41: 'str',
    42: 'str',
    43: 'str',
    54: 'str',
    55: 'str',
    56: 'str',
    57: 'str',
    58: 'str',
    'Postal Code': 'str',
}

def geocode_address(full_address):
    if full_address:
        params = {'q': full_address, 'format': 'json', 'limit': 1}
        try:
            response = requests.get(NOMINATIM_URL, params=params, timeout=10)  # Add a timeout to prevent hanging
            if response.status_code == 200:
                try:
                    data = response.json()
                    if data:
                        return pd.Series([data[0]['lat'], data[0]['lon']])
                except requests.exceptions.JSONDecodeError:
                    return pd.Series([None, None])
        except requests.exceptions.Timeout:
            print(f"Timeout while querying for address: {full_address}")
            return pd.Series([None, None])
    return pd.Series([None, None])

def process_batch(batch_df):
    with ThreadPoolExecutor(max_workers=11) as executor:
        results = executor.map(lambda row: (row.name, *geocode_address(row['Full Address'])), [row for _, row in batch_df.iterrows()])
    for index, lat, lon in results:
        batch_df.at[index, 'Latitude'] = lat
        batch_df.at[index, 'Longitude'] = lon
    return batch_df

# Load CSV and create full address
df = pd.read_csv('C:/Users/al334/Documents/VSCode/design-project/filtered_NY.csv', dtype=dtype_dict)
df['Latitude'] = ''
df['Longitude'] = ''
df['Full Address'] = df['Provider First Line Location Address'] + ', ' + df['City'] + ', ' + df['State'] + ', ' + df['Postal Code'].astype(str)

# Process data in batches and save each batch to a separate CSV file
batch_size = 1000  # Adjust this batch size as needed

for i in range(0, len(df), batch_size):
    start_time = datetime.now()
    batch_df = df.iloc[i:i+batch_size]
    print(f"Processing batch {i//batch_size + 1}")
    processed_batch = process_batch(batch_df)
    
    # Save each batch to a separate CSV file
    batch_output_file = f'C:/Users/al334/Documents/VSCode/design-project/filteredData_with_coordinates_batch_{i//batch_size + 1}.csv'
    processed_batch.to_csv(batch_output_file, index=False)
    
    # Get the completion time
    end_time = datetime.now()
    elapsed_time = end_time - start_time
    print(f"Batch {i//batch_size + 1} processed and saved to {batch_output_file}. Completed at {end_time.strftime('%Y-%m-%d %H:%M:%S')} (Elapsed Time: {elapsed_time}).")

print("All batches processed and saved to separate CSV files!")