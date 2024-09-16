import { NextFunction, Request, Response } from "express";
import { USER_ROLE } from "../module/user/user.constants";

export const verifyUser = (req: Request, res: Response, next:NextFunction)=>{
    const {role} = (req as any).user;
    console.log(role);
    if(role !== USER_ROLE.USER){
      return res.status(303).json({
        success: false,
        message: "Access denied"
      })
    }
    next()
}