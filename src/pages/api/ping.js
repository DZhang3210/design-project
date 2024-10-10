import { run } from '../../src/lib/mongodb';

export default async function handler(req, res) {
  try {
    await run(); // This will connect to MongoDB and run the ping command
    res.status(200).json({ message: 'Ping successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
}