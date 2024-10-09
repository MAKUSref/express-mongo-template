import express from "express";
import { config } from "./config";
import cors from "cors";
import connectToMongo from "./config/mongo.config";
import Logger from "./utils/Logger";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    Logger.info(`Incomming -> Url: [${req.url}] - Status: [${res.statusCode}] `)
  })
  next()
})

connectToMongo();

app.get("/ping", (req, res) => {
  res.send("pong!!!");
});

app.listen(config.port, () => {
  Logger.info(`[server]: Server running on port ${config.port}`);
});
