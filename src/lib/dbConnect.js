import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  throw new Error("Missing MongoDB env variables");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let isConnecting = false;
let isConnected = false;

export const collections = {
  users: "users",
  services: "services",
  bookings: "bookings",
  locations: "locations",
  payments: "payments",
};

export const dbConnect = async (name) => {
  // If already connected, return the collection
  if (isConnected && db) {
    if (!collections[name]) {
      throw new Error(`Collection ${name} not defined`);
    }
    return db.collection(collections[name]);
  }

  // If connection is in progress, wait for it
  if (isConnecting) {
    await new Promise((resolve) => {
      const checkConnection = setInterval(() => {
        if (isConnected) {
          clearInterval(checkConnection);
          resolve();
        }
      }, 100);
    });
    return db.collection(collections[name]);
  }

  // Connect to MongoDB
  try {
    isConnecting = true;
    await client.connect();
    db = client.db(dbName);
    isConnected = true;
    console.log("✅ MongoDB connected");

    if (!collections[name]) {
      throw new Error(`Collection ${name} not defined`);
    }

    return db.collection(collections[name]);
  } catch (error) {
    isConnecting = false;
    console.error("❌ MongoDB connection error:", error);
    throw error;
  } finally {
    isConnecting = false;
  }
};
