// api/chat-records.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function connectToDatabase() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Successfully Connected to MongoDB');
    
    const database = client.db('user-chat');
    return database.collection('chat-history');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

module.exports = async (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can specify your frontend domain here
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  try {
    const collection = await connectToDatabase();

    const documentCount = await collection.countDocuments();
    console.log(`Total Documents in Collection: ${documentCount}`);

    const chatRecords = await collection.find({}).toArray();
    console.log('Fetched Records:', chatRecords.length);

    res.status(200).json(chatRecords);
  } catch (error) {
    console.error('Error in /api/chat-records endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch chat records', details: error.message });
  }
};
