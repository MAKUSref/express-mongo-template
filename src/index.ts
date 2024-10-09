import express from "express";
import { config } from "./config";
import cors from "cors";
import connectToMongo from "./config/mongo.config";

const app = express();

app.use(cors());
app.use(express.json());

connectToMongo();

app.get("/ping", (req, res) => {
  res.send("pong!!!");
});

app.listen(config.port, () => {
  console.log(`[server]: Server running on port ${config.port}`);
});
