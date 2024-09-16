import config from "../../config";
import { USER_ROLE } from "../user/user.constants";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.utils";
import jwt from "jsonwebtoken"
const registerInToDB = async (payload: TUser) => {
    // user existence check 
    const user = await User.findOne({ email: payload.email });
    if (user) {
        throw new Error("user already exists");

    }
    // set user role 
    // payload.role = USER_ROLE.USER;

    // create user 
    const newUser = await User.create(payload);
    return newUser


};
const loginFromDB = async (payload: TLoginUser)=>{
    const user = await User.findOne({email: payload.email});
    if(!user){
        throw new Error("user not found")
    }
    const passwordMatch = await isPasswordMatched(
        payload.password,
        user.password
    )
    if(!passwordMatch){
        throw new Error("password not matched");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    }
    const accessToken = jwt.sign(jwtPayload,config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expire_in
    })

    return{
        accessToken
    }
}

export const authService = {
    registerInToDB,
    loginFromDB
}