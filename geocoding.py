import requests

def get_lat_long(address, api_key):
    # The base URL for Google Geocoding API
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"

    # Define the parameters for the request
    params = {
        'address': address,
        'key': api_key
    }

    # Send the request to the Google Geocoding API
    response = requests.get(base_url, params=params)

    # Convert the response to JSON
    data = response.json()

    # Check if the response contains results
    if data['status'] == 'OK':
        # Extract latitude and longitude from the first result
        location = data['results'][0]['geometry']['location']
        lat = location['lat']
        lng = location['lng']
        return lat, lng
    else:
        print(f"Error: {data['status']}")
        return None

# Example usage
address = "1600 Amphitheatre Parkway, Mountain View, CA"
api_key = "YOUR_GOOGLE_API_KEY"  # Replace with your actual Google API key
lat_long = get_lat_long(address, api_key)

if lat_long:
    print(f"Latitude: {lat_long[0]}, Longitude: {lat_long[1]}")
else:
    print("Unable to geocode the address.")
