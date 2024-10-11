import pandas as pd

# Load the large CSV file
csv_file_path = "C:/Users/al334/Documents/VSCode/design-project/filteredData7.csv"
output_file_path = "filteredData8.csv"

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
    # 'Parent Organization TIN', 
    # 'Authorized Official Name Prefix Text', 
    # 'Authorized Official Name Suffix Text', 
    # 'Authorized Official Credential Text', 
    # 'Certification Date'
    # 'Other Provider Identifier_1', 'Other Provider Identifier Type Code_1', 'Other Provider Identifier State_1', 'Other Provider Identifier Issuer_1', 'Other Provider Identifier_2', 'Other Provider Identifier Type Code_2', 'Other Provider Identifier State_2', 'Other Provider Identifier Issuer_2', 'Other Provider Identifier_3', 'Other Provider Identifier Type Code_3', 'Other Provider Identifier State_3', 'Other Provider Identifier Issuer_3', 'Other Provider Identifier_4', 'Other Provider Identifier Type Code_4', 'Other Provider Identifier State_4', 'Other Provider Identifier Issuer_4', 'Other Provider Identifier_5', 'Other Provider Identifier Type Code_5', 'Other Provider Identifier State_5', 'Other Provider Identifier Issuer_5', 'Other Provider Identifier_6', 'Other Provider Identifier Type Code_6', 'Other Provider Identifier State_6', 'Other Provider Identifier Issuer_6', 'Other Provider Identifier_7', 'Other Provider Identifier Type Code_7', 'Other Provider Identifier State_7', 'Other Provider Identifier Issuer_7', 'Other Provider Identifier_8', 'Other Provider Identifier Type Code_8', 'Other Provider Identifier State_8', 'Other Provider Identifier Issuer_8', 'Other Provider Identifier_9', 'Other Provider Identifier Type Code_9', 'Other Provider Identifier State_9', 'Other Provider Identifier Issuer_9', 'Other Provider Identifier_10', 'Other Provider Identifier Type Code_10', 'Other Provider Identifier State_10', 'Other Provider Identifier Issuer_10', 'Other Provider Identifier_11', 'Other Provider Identifier Type Code_11', 'Other Provider Identifier State_11', 'Other Provider Identifier Issuer_11', 'Other Provider Identifier_12', 'Other Provider Identifier Type Code_12', 'Other Provider Identifier State_12', 'Other Provider Identifier Issuer_12', 'Other Provider Identifier_13', 'Other Provider Identifier Type Code_13', 'Other Provider Identifier State_13', 'Other Provider Identifier Issuer_13', 'Other Provider Identifier_14', 'Other Provider Identifier Type Code_14', 'Other Provider Identifier State_14', 'Other Provider Identifier Issuer_14', 'Other Provider Identifier_15', 'Other Provider Identifier Type Code_15', 'Other Provider Identifier State_15', 'Other Provider Identifier Issuer_15', 'Other Provider Identifier_16', 'Other Provider Identifier Type Code_16', 'Other Provider Identifier State_16', 'Other Provider Identifier Issuer_16', 'Other Provider Identifier_17', 'Other Provider Identifier Type Code_17', 'Other Provider Identifier State_17', 'Other Provider Identifier Issuer_17', 'Other Provider Identifier_18', 'Other Provider Identifier Type Code_18', 'Other Provider Identifier State_18', 'Other Provider Identifier Issuer_18', 'Other Provider Identifier_19', 'Other Provider Identifier Type Code_19', 'Other Provider Identifier State_19', 'Other Provider Identifier Issuer_19', 'Other Provider Identifier_20', 'Other Provider Identifier Type Code_20', 'Other Provider Identifier State_20', 'Other Provider Identifier Issuer_20', 'Other Provider Identifier_21', 'Other Provider Identifier Type Code_21', 'Other Provider Identifier State_21', 'Other Provider Identifier Issuer_21', 'Other Provider Identifier_22', 'Other Provider Identifier Type Code_22', 'Other Provider Identifier State_22', 'Other Provider Identifier Issuer_22', 'Other Provider Identifier_23', 'Other Provider Identifier Type Code_23', 'Other Provider Identifier State_23', 'Other Provider Identifier Issuer_23', 'Other Provider Identifier_24', 'Other Provider Identifier Type Code_24', 'Other Provider Identifier State_24', 'Other Provider Identifier Issuer_24', 'Other Provider Identifier_25', 'Other Provider Identifier Type Code_25', 'Other Provider Identifier State_25', 'Other Provider Identifier Issuer_25', 'Other Provider Identifier_26', 'Other Provider Identifier Type Code_26', 'Other Provider Identifier State_26', 'Other Provider Identifier Issuer_26', 'Other Provider Identifier_27', 'Other Provider Identifier Type Code_27', 'Other Provider Identifier State_27', 'Other Provider Identifier Issuer_27', 'Other Provider Identifier_28', 'Other Provider Identifier Type Code_28', 'Other Provider Identifier State_28', 'Other Provider Identifier Issuer_28', 'Other Provider Identifier_29', 'Other Provider Identifier Type Code_29', 'Other Provider Identifier State_29', 'Other Provider Identifier Issuer_29', 'Other Provider Identifier_30', 'Other Provider Identifier Type Code_30', 'Other Provider Identifier State_30', 'Other Provider Identifier Issuer_30', 'Other Provider Identifier_31', 'Other Provider Identifier Type Code_31', 'Other Provider Identifier State_31', 'Other Provider Identifier Issuer_31', 'Other Provider Identifier_32', 'Other Provider Identifier Type Code_32', 'Other Provider Identifier State_32', 'Other Provider Identifier Issuer_32', 'Other Provider Identifier_33', 'Other Provider Identifier Type Code_33', 'Other Provider Identifier State_33', 'Other Provider Identifier Issuer_33', 'Other Provider Identifier_34', 'Other Provider Identifier Type Code_34', 'Other Provider Identifier State_34', 'Other Provider Identifier Issuer_34', 'Other Provider Identifier_35', 'Other Provider Identifier Type Code_35', 'Other Provider Identifier State_35', 'Other Provider Identifier Issuer_35', 'Other Provider Identifier_36', 'Other Provider Identifier Type Code_36', 'Other Provider Identifier State_36', 'Other Provider Identifier Issuer_36', 'Other Provider Identifier_37', 'Other Provider Identifier Type Code_37', 'Other Provider Identifier State_37', 'Other Provider Identifier Issuer_37', 'Other Provider Identifier_38', 'Other Provider Identifier Type Code_38', 'Other Provider Identifier State_38', 'Other Provider Identifier Issuer_38', 'Other Provider Identifier_39', 'Other Provider Identifier Type Code_39', 'Other Provider Identifier State_39', 'Other Provider Identifier Issuer_39', 'Other Provider Identifier_40', 'Other Provider Identifier Type Code_40', 'Other Provider Identifier State_40', 'Other Provider Identifier Issuer_40', 'Other Provider Identifier_41', 'Other Provider Identifier Type Code_41', 'Other Provider Identifier State_41', 'Other Provider Identifier Issuer_41', 'Other Provider Identifier_42', 'Other Provider Identifier Type Code_42', 'Other Provider Identifier State_42', 'Other Provider Identifier Issuer_42', 'Other Provider Identifier_43', 'Other Provider Identifier Type Code_43', 'Other Provider Identifier State_43', 'Other Provider Identifier Issuer_43', 'Other Provider Identifier_44', 'Other Provider Identifier Type Code_44', 'Other Provider Identifier State_44', 'Other Provider Identifier Issuer_44', 'Other Provider Identifier_45', 'Other Provider Identifier Type Code_45', 'Other Provider Identifier State_45', 'Other Provider Identifier Issuer_45', 'Other Provider Identifier_46', 'Other Provider Identifier Type Code_46', 'Other Provider Identifier State_46', 'Other Provider Identifier Issuer_46', 'Other Provider Identifier_47', 'Other Provider Identifier Type Code_47', 'Other Provider Identifier State_47', 'Other Provider Identifier Issuer_47', 'Other Provider Identifier_48', 'Other Provider Identifier Type Code_48', 'Other Provider Identifier State_48', 'Other Provider Identifier Issuer_48', 'Other Provider Identifier_49', 'Other Provider Identifier Type Code_49', 'Other Provider Identifier State_49', 'Other Provider Identifier Issuer_49', 'Other Provider Identifier_50', 'Other Provider Identifier Type Code_50', 'Other Provider Identifier State_50', 'Other Provider Identifier Issuer_50'
    # 'Provider License Number_1', 'Provider License Number State Code_1',
    # 'Provider License Number_2', 'Provider License Number State Code_2',
    # 'Provider License Number_3', 'Provider License Number State Code_3',
    # 'Provider License Number_4', 'Provider License Number State Code_4',
    # 'Provider License Number_5', 'Provider License Number State Code_5',
    # 'Provider License Number_6', 'Provider License Number State Code_6',
    # 'Provider License Number_7', 'Provider License Number State Code_7',
    # 'Provider License Number_8', 'Provider License Number State Code_8',
    # 'Provider License Number_9', 'Provider License Number State Code_9',
    # 'Provider License Number_10', 'Provider License Number State Code_10',
    # 'Provider License Number_11', 'Provider License Number State Code_11',
    # 'Provider License Number_12', 'Provider License Number State Code_12',
    # 'Provider License Number_13', 'Provider License Number State Code_13',
    # 'Provider License Number_14', 'Provider License Number State Code_14',
    # 'Provider License Number_15', 'Provider License Number State Code_15',
    # 'NPI Deactivation Date', 'NPI Reactivation Date', 'NPI Deactivation Reason Code',
    # 'Provider Enumeration Date', 'Last Update Date'
    'Fax Number', 'Country', 'Entity Type Code', 'Parent Organization LBN',
    'Is Organization Subpart', 'Is Sole Proprietor']

chunksize = 10000
try:
    # Process the file in chunks
    for i, chunk in enumerate(pd.read_csv(csv_file_path, chunksize=chunksize)):
        print(f"Processing chunk {i + 1}...")

        # Drop the unnecessary columns in the current chunk
        chunk_trimmed = chunk.drop(columns=columns_to_remove, errors='ignore')  # 'errors="ignore"' will ignore columns that don't exist

        # Write the first chunk with headers, append subsequent chunks without headers
        if i == 0:
            chunk_trimmed.to_csv(output_file_path, mode='w', index=False)  # First chunk writes with headers
        else:
            chunk_trimmed.to_csv(output_file_path, mode='a', index=False, header=False)  # Subsequent chunks append without headers

    print(f"Trimmed CSV saved to {output_file_path}")

except Exception as e:
    print(f"Error occurred: {e}")