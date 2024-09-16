import { Request, Response } from "express";
import { authService } from "./auth.service";
import { createToken } from "./auth.createToken";
import config from "../../config";

const register = async (req: Request, res: Response) => {
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
            message: "user register successfully",
            data: result,
            tokenData: token 
        })
    } catch (error) {
        console.log(error);
    }
}
const login = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await authService.loginFromDB(req.body);
    res.status(200).json({
        success: true,
        message: "user login successfully",
        data: {
            accessToken
        }
    })
  } catch (error) {
    
  }
}

export const authController = {
    register,
    login
}