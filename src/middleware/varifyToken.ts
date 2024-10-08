import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";


// verify token for middleware 
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Token not found",
        })
        console.log("token not found authorization denied");
    }
    try {
        const decoded = jwt.verify(token as string, config.jwt_access_secret as string);
            (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid Token",
        })
        console.log(error,"token not found authorization denied");
    }

}


