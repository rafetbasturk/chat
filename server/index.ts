import "dotenv/config";
import http from "http";
import { connection, socketIo } from "./config/socket";
import { connectDB } from "./config/mongoose";
import app from "./config/express";

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

export const io = socketIo(httpServer, process.env.NODE_ENV);

connection(io);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    console.log("Connected to DB");
    httpServer.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  httpServer.close(() => {
    process.exit(1);
  });
});

start();
