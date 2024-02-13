import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import bodyParser from "body-parser";
import { initializeDatabase } from "./db";
import { authRoute } from "./routes/auth.routes";
// import helmet from "helmet";

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/", authRoute);
app.use(globalErrorHandler);

app.listen(port, async () => {
  await initializeDatabase();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
