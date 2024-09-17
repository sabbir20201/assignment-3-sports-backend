import { error } from "console";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync =(fn: RequestHandler)=>{
    return async(req:Request, res:Response, next: NextFunction)=>{
        Promise.resolve(fn(req, res, next)).catch((): void=>{
            console.log(error);
            next(error)
            
        })
    }
}