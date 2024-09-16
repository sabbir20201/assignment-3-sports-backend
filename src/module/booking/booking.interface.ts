import { Types } from "mongoose";
import { TFacility } from "../facility/facility.interface";
import { TUser } from "../user/user.interface";

export type TBooking = {
    facility: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    user: Types.ObjectId;
    payableAmount: number;
    isBooked: 'confirmed'| 'cancel';
}

// export interface IBooking extends Document {
//     facility: TFacility['_id'];
//     date: string;
//     startTime: string;
//     endTime: string;
//     user: TUser['_id'];
//     payableAmount: number;
//     isBooked: 'confirmed' | 'cancel' | 'pending' | 'rescheduled';
// }