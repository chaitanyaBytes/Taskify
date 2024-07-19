import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./database/dbConnect";
import { userRouter } from "./routes/userRoutes";
import { todoRouter } from "./routes/todoRoutes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded());
dbConnect();
app.use(cors());

app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.listen(port, () => console.log(`server running on port ${port}`));
