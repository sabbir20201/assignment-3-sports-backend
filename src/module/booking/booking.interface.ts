import { Types } from "mongoose";

export type TBooking = {
    facility: string;
    date: string;
    startTime: string;
    endTime: string;
    user: Types.ObjectId;
    payableAmount: number;
    isBooked: 'confirmed'| 'cancel';
}