import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UserRole } from "../models/user.models";
import userService from "../services/user.service";

/**
 * This function checks if the user is authorized
 * @param req the request object
 * @param res the response object
 * @param next the next function
 * @returns the next function
 */
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization; //Bearer token

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    token = token.replace("Bearer ", "");
    const decode: any = jwt.verify(token, process.env.JWT_SECRET || "secret"); //decode the token
    req.body.loggedUser = decode;

    const foundUser: any = await userService.findById(decode.user_id); //find the user by id

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    //check if the user is authorized
    if (req.path === "/users/profile") {
      req.params.id = decode.user_id;
    } else if (req.path.startsWith("/users")) {
      if (foundUser.role !== UserRole.SUPERADMIN) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }
    } else if (
      req.path.startsWith("/events") ||
      req.path.startsWith("/organizer")
    ) {
      if (
        req.method === "POST" ||
        req.method === "PUT" ||
        req.method === "DELETE"
      ) {
        if (foundUser.role !== UserRole.ORGANIZER) {
          return res.status(403).json({ message: "Insufficient permissions" });
        }
        req.body.organizer = decode.user_id;
      }
    } else if (req.path.startsWith("/subscriptions")) {
        if (foundUser.role !== UserRole.ASSISTANT) {
          return res.status(403).json({ message: "Insufficient permissions" });
        }
        req.body.userId = decode.user_id;
    }

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return res.status(401).json({ message: "Token Expired", error });
    else return res.status(401).json({ message: "Token Invalid", error });
  }
};

export default auth;
