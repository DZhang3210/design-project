import pandas as pd

# Path to your CSV file and output file
csv_file_path = "C:/Users/al334/Documents/VSCode/design-project/data.csv"
output_file_path = "filteredData.csv"
chunksize = 10000  # Process 10,000 rows at a time

# List of columns to drop
columns_to_remove = [
    # 'Employer Identification Number (EIN)', 
    # 'Provider Other Organization Name', 
    # 'Provider Other Organization Name Type Code', 
    # 'Provider Other Last Name', 
    # 'Provider Other First Name', 
    # 'Provider Other Middle Name', 
    # 'Provider Other Name Prefix Text', 
    # 'Provider Other Name Suffix Text', 
    # 'Provider Other Credential Text', 
    # 'Provider Other Last Name Type Code', 
    # 'Provider First Line Business Mailing Address', 
    # 'Provider Second Line Business Mailing Address', 
    # 'Provider Business Mailing Address City Name', 
    # 'Provider Business Mailing Address State Name', 
    # 'Provider Business Mailing Address Postal Code', 
    # 'Provider Business Mailing Address Country Code (If outside U.S.)', 
    # 'Provider Business Mailing Address Telephone Number', 
    # 'Provider Business Mailing Address Fax Number', 
    # 'Provider Gender Code', 
    # 'Authorized Official Last Name', 
    # 'Authorized Official First Name', 
    # 'Authorized Official Middle Name', 
    # 'Authorized Official Title or Position', 
    # 'Authorized Official Telephone Number'
]

try:
    with pd.read_csv(csv_file_path, engine='python', chunksize=chunksize) as reader:
        for i, chunk in enumerate(reader):
            # Step 1: Filter rows where 'Country Code' is 'US'
            df_filtered = chunk[chunk['Provider Business Practice Location Address Country Code (If outside U.S.)'] == 'US']

            # Step 2: Drop unnecessary columns
            df_filtered = df_filtered.drop(columns=columns_to_remove, errors='ignore')  # 'errors="ignore"' will skip columns that are not found

            # Step 3: Write filtered and trimmed data to the output file
            if i == 0:
                # For the first chunk, write headers
                df_filtered.to_csv(output_file_path, mode='w', header=True, index=False)
            else:
                # For subsequent chunks, append without writing the header
                df_filtered.to_csv(output_file_path, mode='a', header=False, index=False)
except Exception as e:
    print(f"Error occurred: {e}")
