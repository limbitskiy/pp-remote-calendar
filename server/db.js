const { MongoClient } = require("mongodb");

const DB_NAME = process.env.MONGODB_NAME || "sandbox-db";
const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || "admin";
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || "admin";

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    // MongoClient.connect(`mongodb://${USERNAME}:${PASSWORD}@localhost:27017`)
    MongoClient.connect(`mongodb://${USERNAME}:${PASSWORD}@mongodb`)
      .then((client) => {
        dbConnection = client.db(DB_NAME);
        return cb();
      })
      .catch((err) => {
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
