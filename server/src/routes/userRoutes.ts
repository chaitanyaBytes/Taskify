import express from "express";
import signup from "../handlers/signup";
import login from "../handlers/login";
import me from "../handlers/me";
import jwtAuthentication from "../middlewares/middleware";
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/me", jwtAuthentication, me);

export { userRouter };
