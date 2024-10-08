import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { createToken } from "./auth.createToken";
import config from "../../config";
import { isPasswordMatched } from "./auth.utils";
const register = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const data = req.body
        const result = await authService.registerInToDB(data)
        const tokenData = {
            email: data.email,
            role: data.role
        }
        const token = createToken(tokenData, config.jwt_access_secret as string,config.jwt_access_expire_in as string)

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User registered successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'use another email',
            error: `${error?.errorResponse?.keyValue.email} is already exist`
          
        })
     
    }
}


const login = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await authService.loginFromDB(userData);
    
    if(!user){
        throw new Error("user not found")
    }
    const passwordMatch = await isPasswordMatched(
        userData.password,
        user.password
    )
    if(!passwordMatch){
        throw new Error("password not matched");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    }

    const token = createToken(jwtPayload, config.jwt_access_secret as string,config.jwt_access_expire_in as string)
    
    
    const userLoginData = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
    }
  
    res.cookie('token', token, {
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        token: token,
        data: userLoginData,
   

    })
  } catch (error) {
    res.json({
        success: false,
        statusCode: 500,
        error: (error as any).message
    })    
  }
}

export const authController = {
    register,
    login
}