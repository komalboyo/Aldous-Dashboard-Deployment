const { MongoClient } = require('mongodb');
require('dotenv').config();

async function connectToDatabase() {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const database = client.db('user-chat');
        return database.collection('chat-history');
    } catch (error) {
        throw new Error('MongoDB Connection Error: ' + error.message);
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const collection = await connectToDatabase();
            const chatRecords = await collection.find({}).toArray();
            res.status(200).json(chatRecords);
        } catch (error) {
            res.status(500).json({ 
                error: 'Failed to fetch chat records', 
                details: error.message 
            });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
