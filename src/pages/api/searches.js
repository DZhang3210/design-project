import { MongoClinet } from 'mongodb';

const uri = process.env.MONGODB.URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { location, condition, insurance } = req.query;
  
      try {
        await client.connect();
        const database = client.db('myDatabase'); // Replace with your actual database name
        const collection = database.collection('healthcareProviders'); // Replace with your collection name
  
        // Build the MongoDB query
        const query = {};
        if (location) {
            query.location = location;
        }
    
        if (condition) {
            query.conditions = condition;
        }
    
        if (insurance) {
            query.insuranceTypes = insurance;
        }
  
        // Execute the query
        const providers = await collection.find(query).toArray();
  
        // Respond with the matching providers
        res.status(200).json(providers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching providers from the database' });
      } finally {
        await client.close();
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }