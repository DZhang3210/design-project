import pandas as pd
import geojson
import numpy as np

# Load the CSV file
csv_file = r'C:/Users/al334/Documents/VSCode/design-project/geocoded.csv'
data = pd.read_csv(csv_file)

# Replace NaN values in all columns with the string "None"
data = data.fillna("None")

# Open the file in write mode
with open('output.geojson', 'w') as f:
    # Write the start of the FeatureCollection
    f.write('{"type": "FeatureCollection", "features": [\n')

    # Loop over each row to create a GeoJSON feature
    for i, (_, row) in enumerate(data.iterrows()):
        # Ensure latitude and longitude are valid numeric values
        latitude = row['Latitude']
        longitude = row['Longitude']
        
        # Skip rows with invalid latitude or longitude
        if pd.isna(latitude) or pd.isna(longitude) or np.isinf(latitude) or np.isinf(longitude):
            continue

        # Create a GeoJSON feature for each row
        feature = geojson.Feature(
            geometry=geojson.Point((longitude, latitude)),
            properties=row.drop(['Latitude', 'Longitude']).to_dict()
        )

        # Dump the feature as a JSON string
        feature_str = geojson.dumps(feature)

        # Write the feature to file, with a comma after each feature except the last
        if i > 0:
            f.write(',\n')
        f.write(feature_str)

    # Write the end of the FeatureCollection
    f.write('\n]}')

print("GeoJSON file created successfully!")