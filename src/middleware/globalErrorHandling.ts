import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";


export const globalErrorHandler: ErrorRequestHandler = async (
    err, req, res, next) => {

    let statusCode = 500;
    let message = "something went wrong";


    let errorSources = [{
        path: "",
        message: "something went wrong"
    }]

    if (err instanceof ZodError) {
        const handledZodError = handleZodError(err)
        statusCode = handledZodError.statusCode;
        message = handledZodError.message;
        errorSources = handledZodError.errorSources;

        res.status(statusCode).json({
            success: false,
            message,
            errorSources,
            err
        })
    }
}

