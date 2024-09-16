import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "../config";
import { User } from "../module/user/user.model";
export const auth = (req: Request, res: Response, next: NextFunction)=>{
    return async()=>{
        const accessToken = req.headers.authorization;
        if(accessToken){
            throw new Error("401 you are not authorised to ccess")
        }
        const verifiedToken = jwt.verify(accessToken as string,config.jwt_access_secret as string)
        const {role, email} = verifiedToken as string;
        const user = await User.findOne({email});
        if(!user){
            throw new Error("user not found")
        }
        if()
    }
}