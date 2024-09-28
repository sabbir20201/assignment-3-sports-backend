import { NextFunction, Request, Response } from "express"
import config from "../config"
import jwt, { JwtPayload } from "jsonwebtoken"


export const auth = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "you have no access to this route"
            })
        }
        try {
            const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(401).json({
                    success: false,
                    statusCode: 403,
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
