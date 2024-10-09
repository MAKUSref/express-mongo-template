import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || "mongodb://localhost:27017/",
  databaseName: process.env.DATABASE_NAME || "db",
  databaseUsername: process.env.DATABASE_USERNAME || "root",
  databasePassword: process.env.DATABASE_PASSWORD || "toor",
};
