import mongoose from "mongoose";
import { config } from ".";

export default async function connectToMongo() {
  const db = mongoose.connection;
  db.on("error", (err) => {
    console.error(err);
  });

  db.once("connected", () => {
    console.log("[database]: Connected to mongo database");
  });

  try { 
    return await mongoose.connect(config.databaseUrl, {
      dbName: config.databaseName,
      user: config.databaseUsername,
      pass: config.databasePassword,
    });
  } catch (err) {
    console.error(err);
  }
}
