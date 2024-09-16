import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validateRequest = (schema:AnyZodObject)=>{
    return async(req: Request, res: Response, next:NextFunction)=>{
        const parsedData = await schema.parseAsync({
            body: req.body
        
        })
        req.body = parsedData.body;
        next();
    }
}

export default validateRequest