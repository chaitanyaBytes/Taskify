import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../database/userSchema";

export const SECRET = "S3CR3T";

interface RequestTypes extends Request {
  user?: Object;
}

const jwtAuthentication = async (
  req: RequestTypes,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ error: "no authorization headers found" });
    }

    const token = authHeader.split(" ")[1];
    if (!token && typeof token !== "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const verified = jwt.verify(token, SECRET);

      if (typeof verified !== "object" || !("username" in verified)) {
        return res.status(403).json({ error: "Invalid token payload" });
      }

      const username: string = (verified as JwtPayload).username;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(403).json({ error: "user not found" });
      }

      req.headers["userId"] = user._id.toString();
      //req.headers["user"] = JSON.stringify(user)
      //req.user = user

      next();
    } catch (e) {
      console.log(`JWT verification failed ${e}`);
      return res.status(500).json({ error: "forbidden" });
    }
  } catch (e) {
    console.log(`error: ${e}`);
    return res.status(500).json({ error: "internal server erorr" });
  }
};

export default jwtAuthentication;
