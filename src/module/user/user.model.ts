import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constants";

const UserSchema = new Schema<TUser>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true,'email is required' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        required: [true, 'Role is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    }
})


export const User = model<TUser>('User', UserSchema)