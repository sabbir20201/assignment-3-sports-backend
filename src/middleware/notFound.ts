import { NextFunction, Request, Response } from "express";


export const notFoundHandler = (req:Request,res: Response, next: NextFunction)=>{
    res.status(403).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    })
}