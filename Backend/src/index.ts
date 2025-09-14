import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectDb } from "./config/connect";
import authRouter from "./routes/authRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter)

app.get("/test", (req: Request, res: Response) => {
  return res.json({ message: "Test" });
});

async function start() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

start();
