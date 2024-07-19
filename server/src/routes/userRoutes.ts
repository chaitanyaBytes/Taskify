import express from "express";
import signup from "../handlers/signup";
import login from "../handlers/login";
import getUser from "./getUser";
import jwtAuthentication from "../middlewares/middleware";
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/:username", jwtAuthentication, getUser);

export { userRouter };
