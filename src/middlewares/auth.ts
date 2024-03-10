import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UserRole } from "../models/user.models";
import userService from "../services/user.service";

const auth  =  async (req: Request, res: Response, next: NextFunction) => {
    try { 
        let token =  req.headers.authorization;

        if (!token){
            return res.status(401).json({message: "Not authorized"});
        }

        token = token.replace("Bearer ","");
        const  decode: any = jwt.verify(token, process.env.JWT_SECRET || "secret"); 
        req.body.loggedUser =  decode;

        const foundUser = await userService.findById(decode.user_id);

        if (!foundUser) {
            return res.status(404).json({message: "User not found"});
        }
        
        if (req.path === "/users/profile") {
            // Route "/users/profile": Only an authenticated user can access
            req.params.id = decode.user_id;
        } else if (req.path.startsWith("/users")) {
            // Route "/users": Only a superadmin can access
            if (foundUser.role !== UserRole.SUPERADMIN) {
                return res.status(403).json({ message: "Insufficient permissions" });
            } 
        } 

        next();
        
    } catch(error) {
        if (error instanceof TokenExpiredError)
            return res.status(401).json({message: "Token Expired", error });
        else 
            return res.status(401).json({message: "Token Invalid", error });
    }
}

export default auth;