const { MongoClient } = require('mongodb');
console.log("MONGO URI:", process.env.MONGO_URI);
let db;

const initDb = async (callback) => {
  if (db) return callback(null, db);

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    db = client.db();
    callback(null, db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => db;

module.exports = { initDb, getDb };