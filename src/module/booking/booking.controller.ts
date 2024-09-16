import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { createBookingSchema } from "./booking.zod";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";

const bookingAFacility = async(req: Request, res: Response)=>{
try {
    const {facility, date, startTime, endTime} = req.body;
    // const validateData = createBookingSchema.parse(bookingData)
    const userEmail = (req as any).user?.email;
    const userField = await User.findOne({email: userEmail})
    if(!userField){
        console.log("not found");
        
    }
    const user = (userField as any)._id.toString()
    const data: TBooking = {
        facility,
        date,
        startTime,
        endTime,
        user,
        payableAmount: 90,
        isBooked:"confirmed", 
    }
    console.log(data,"all data");
    
    // const bookingAllData = {...validateData, userId}
    const result = await bookingService.bookingInToDB(data);
    res.status(200).json({
        success: true,
        message: "booking created successfully",
        data: result
    })
} catch (error) {
    console.log(error);
    
}
}

export const BookingControllers = {
    bookingAFacility
}