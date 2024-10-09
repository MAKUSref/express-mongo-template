import mongoose from "mongoose";
import { config } from ".";
import Logger from "../utils/Logger";

export default async function connectToMongo() {
  const db = mongoose.connection;
  db.on("error", (err) => {
    Logger.error(err);
  });

  db.once("connected", () => {
    Logger.success("[database]: Connected to mongo database");
  });

  try { 
    return await mongoose.connect(config.databaseUrl, {
      dbName: config.databaseName,
      user: config.databaseUsername,
      pass: config.databasePassword,
    });
  } catch (err) {
    Logger.error(err);
  }
}
