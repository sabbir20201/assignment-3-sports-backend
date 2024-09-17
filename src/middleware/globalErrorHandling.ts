import { NextFunction, Request, Response } from "express";

 const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    type TErrorSource = {
        path: string | number;
        message: string;
    }[]
    const errorSources: TErrorSource = [{
        path: '',
        message: 'Something went wrong'
    }]
    
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
    })
}

export default globalErrorHandler