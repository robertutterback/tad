import { v4 as uuid } from 'uuid';
import { MongoClient, ObjectId } from 'mongodb';

// @TODO: Add a connection string to the .env.local file
const uri = "mongodb://localhost:27017";
const dbClient = new MongoClient(uri);
await dbClient.connect();
await dbClient.db("admin").command({ ping: 1 });
console.log(`Successfully connected to MongoDB: ${uri}`);

export async function getUser(username) {
  return dbClient.db("App").collection("users").findOne({ username });
}

export async function getDatasetInfo(id) {
  return dbClient.db("App").collection("datasets").findOne({ _id: ObjectId(id) });
}

export async function addDataset(info) {
  return dbClient.db("App").collection("datasets").insertOne(info);
}

export async function delDataset(id) {
  return dbClient.db("App").collection("datasets").deleteOne({ _id: ObjectId(id) });
}

// @TODO: also consider the 'readers' field
export async function getAccessibleDatasets(username) {
  let cursor = dbClient.db("App").collection("datasets").find({ owner: username });
  cursor = cursor.project({ files: 0 });
  return cursor.toArray();
}

// @TODO: Use Redis instead of in-memory map.
let sessions = new Map();

export async function makeSession(username) {
  const id = uuid();
  const session = { id, username };
  sessions.set(id, session);
  return Promise.resolve(session);
}

export async function getSession(id) {
  return Promise.resolve(sessions.get(id));
}

export async function delSession(id) {
  return Promise.resolve(sessions.delete(id));
}


