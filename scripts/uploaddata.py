import json
from pymongo import MongoClient

mongo_uri = "mongodb+srv://al6894:<dbpassword>@dev-cluster.7q4va.mongodb.net/"
database_name = "MedConnect"
collection_name = "provider-data"

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

# Load the GeoJSON file
with open('data.geojson', 'r') as f:
    geojson_data = json.load(f)

# Insert features with custom _id as NPI
if geojson_data['type'] == 'FeatureCollection':
    features = geojson_data['features']
    for feature in features:
        # Set `_id` field to the NPI from properties, if available
        feature['_id'] = feature['properties'].get('NPI', None)
        
    collection.insert_many(features, ordered=False)
    print("GeoJSON data with custom _id uploaded successfully!")
else:
    print("The file does not contain a valid GeoJSON FeatureCollection.")