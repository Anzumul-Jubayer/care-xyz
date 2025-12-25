const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1 },
});

async function testConnection() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collections = await db.collections();
    console.log("MongoDB connected! Collections:", collections.map(c => c.collectionName));
    await client.close();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

testConnection();
