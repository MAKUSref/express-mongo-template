import express, { Express } from "express";
import cors from "cors";
import connectToMongo from "./mongo.config";
import Logger from "./logger.config";
import { errorHandler } from "@/excpetion/errorHandler";

class App {
  private static instance?: App;
  app: Express;

  private constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.initLogger();
    
    connectToMongo();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new App();
    }
    return this.instance.app;
  }

  private initLogger() {
    this.app.use((req, res, next) => {
      res.on('finish', () => {
        Logger.info(`Incomming -> Url: [${req.url}] - Status: [${res.statusCode}] `)
      })
      next()
    })
  }
}

const app = App.getInstance();
const router = express.Router();

export { router };
export default app;