import path from "path";
import express, { Express, Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// local middlewares
import notFoundMiddleware from "../middlewares/notFoundMiddleware";
import errorHandlerMiddleware from "../middlewares/errorHandlerMiddleware";

// routes
import authRouter from "../routes/authRoutes";
import userRouter from "../routes/userRoutes";
import conversationRouter from "../routes/conversationRoutes";
import messageRouter from "../routes/messageRoutes";

const app: Express = express();

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client", "dist", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
