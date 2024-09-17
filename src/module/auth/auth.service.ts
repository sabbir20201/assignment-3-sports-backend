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
    // create user 
    const newUser = await User.create(payload);
    return newUser


};
const loginFromDB = async (payload: TLoginUser)=>{
    const user = await User.findOne({email: payload.email});
    return user
}

export const authService = {
    registerInToDB,
    loginFromDB
}