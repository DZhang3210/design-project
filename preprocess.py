import pandas as pd

# Dataset link: https://download.cms.gov/nppes/NPI_Files.html

# Path to the CSV file
csv_file_path = "enter file path"
output_file_path = "enter output path"
chunksize = 10000  # Process 10,000 rows at a time (My PC is not a supercomputer)

# Define a dictionary of new column names
new_column_names = {
    "Provider Organization Name (Legal Business Name)": "Organization Name",
    "Provider Last Name (Legal Name)": "Provider Last Name",
    'Provider Name Prefix Text': 'Provider Prefix',
    'Provider Name Suffix Text': 'Provider Suffix',
    'Provider Credential Text': 'Provider Credential',
    'Provider First Line Business Practice Location Address': 'Provider First Line Location Address',
    'Provider Second Line Business Practice Location Address': 'Provider Second Line Location Address',
    'Provider Business Practice Location Address City Name': 'City',
    'Provider Business Practice Location Address State Name': 'State',
    'Provider Business Practice Location Address Postal Code': 'Postal Code',
    'Provider Business Practice Location Address Country Code (If outside U.S.)': 'Country',
    'Provider Business Practice Location Address Telephone Number': 'Telephone Number',
    'Provider Business Practice Location Address Fax Number': 'Fax Number',
}

# Define the columns for deactivated and reactivated dates
deactivated_column = 'NPI Deactivation Date'  
reactivated_column = 'NPI Reactivation Date'  

# Assuming the column name for postal codes is 'Postal Code'
postal_code_column = 'Postal Code'

# Assuming the column name for country code is 'Country'
country_column = 'Country'

# Flag for writing headers only once
first_chunk = True

# Process the CSV file in chunks
try:
    for i, chunk in enumerate(pd.read_csv(csv_file_path, engine='python', chunksize=chunksize)):
        print(f"Processing chunk {i + 1}...")

        # Step 1: Rename the columns in the current chunk
        chunk.rename(columns=new_column_names, inplace=True)

        # Step 2: Truncate postal codes to the first 5 digits
        if postal_code_column in chunk.columns:
            chunk[postal_code_column] = chunk[postal_code_column].astype(str).str[:5]

        # Step 3: Filter out rows based on deactivation/reactivation dates
        condition_to_keep = ~(pd.notna(chunk[deactivated_column]) & pd.isna(chunk[reactivated_column]))

        # Step 4: Filter out rows where the country is not 'US'
        if country_column in chunk.columns:
            country_condition = (chunk[country_column] == 'US')
            condition_to_keep = condition_to_keep & country_condition

        # Filter the chunk to keep only rows that match both conditions
        chunk_filtered = chunk[condition_to_keep]

        # Write the first chunk with headers, and subsequent chunks without headers
        if first_chunk:
            chunk_filtered.to_csv(output_file_path, mode='w', index=False, header=True)
            first_chunk = False
        else:
            chunk_filtered.to_csv(output_file_path, mode='a', index=False, header=False)

    print(f"CSV with updated column names, truncated postal codes, filtered rows based on dates, and 'US' country code saved to {output_file_path}")

except Exception as e:
    print(f"Error occurred: {e}")