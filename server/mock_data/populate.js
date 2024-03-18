import "dotenv";
import { readFile } from "fs/promises";
import { connectDB } from "../config/mongoose";
import Message from "../models/messageModel";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Message.deleteMany();

    // const data = JSON.parse(await readFile(new URL("./mock-data.json", import.meta.url)))
    const data = JSON.parse(await readFile("./mock_data/messages.json"));
    await Message.create(data);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
