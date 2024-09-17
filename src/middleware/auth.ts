// export const verifyAdmin = (req: Request, res: Response, next:NextFunction)=>{
//     const {role} = (req as any).user;
//     console.log(role);
//     if(role !== USER_ROLE.ADMIN){
//       return res.status(303).json({
//         success: false,
//         message: "Access denied"
//       })
//     }
//     next()

import { NextFunction, Request, Response } from "express"
import config from "../config"
import jwt from "jsonwebtoken"

// }
export const auth = (allowedRoles: string[])=>{
    return (req: Request, res: Response, next: NextFunction)=>{
        const token = req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message:"you have no access to this route"
            })
        }
        try {
            const decoded = jwt.verify(token, config.jwt_access_secret as string)
            if(!allowedRoles.includes(decoded.role)){
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: "you have no access this route"
                })
            } 
            (req as any).user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "invalid token authentication failed"
            })
        }
    }
}
