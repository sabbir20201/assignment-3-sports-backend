import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { createBookingSchema } from "./booking.zod";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const bookingAFacility = async(req: Request, res: Response)=>{
try {
    const {facility, date, startTime, endTime} = req.body;
    // const validateData = createBookingSchema.parse(bookingData)
    const userEmail = (req as any).user?.email;
    const userField = await User.findOne({email: userEmail})
    if(!userField){
        console.log("User not found");
        
    }
    const user = (userField as any)._id.toString()

    const isFacilityExists = await Facility.findOne({_id: facility});
    if(!isFacilityExists){
        return res.status(404).json({
            success: false,
            message: 'Facility not found'
        });
    }
    const facilityId = (isFacilityExists as any)._id.toString()

    const data: TBooking = {
        facility: facilityId,
        date,
        startTime,
        endTime,
        user,
        payableAmount: 90,
        isBooked:"confirmed", 
    }
    
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
const getAllBookings = async(req: Request, res: Response)=>{
try {
    const AllBookings = await Booking.find()
        .populate({
            path: 'facility',
            select: "name description pricePerHour location isDeleted"
        })
        .populate({
            path: "user",
            select: "name email phone role address"
        })
        .exec();
        res.status(200).json({
            success: true,
            message: "all bookings got successfully",
            data: AllBookings
        })
} catch (error) {
    console.log(error);
    
    res.status(200).json({
        success: false,
        message: "no booking found",
       
    })
}
}
// const getBookingByUser = async(req: Request, res: Response)=>{
// try {
//     const userEmail = (req as any).user?.email;
//     // const userField = await User.findOne({email: userEmail})
//     // if(!userField){
//     //     console.log("User not found");
        
//     // }
//     // const user = (userField as any)._id.toString()
//     const findAUserBookings = await Booking.findOne({email:userEmail})
//         .populate({
//             path: 'facility',
//             select: "name description pricePerHour location isDeleted"
//         })
//         // .populate({
//         //     path: "user",
//         //     select: "name email phone role address"
//         // })
//         .exec();
//         res.status(200).json({
//             success: true,
//             message: "all bookings got successfully",
//             data: findAUserBookings
//         })
// } catch (error) {
//     console.log(error);
    
//     res.status(200).json({
//         success: false,
//         message: "no booking found",
       
//     })
// }
// }

// const getAllBookings = async (req: Request, res: Response) => {
//     try {
//         const bookings = await Booking.find()
//             .populate({
//                 path: 'facility',
//                 select: 'name description pricePerHour location isDeleted' // Specify fields to include
//             })
//             .populate({
//                 path: 'user',
//                 select: 'name email phone role address' // Specify fields to include
//             })
//             .exec();

//         res.status(200).json({
//             success: true,
//             statusCode: 200,
//             message: 'Bookings retrieved successfully',
//             data: bookings
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'An error occurred while retrieving bookings'
//         });
//     }
// };
// const getBookingByUser = async (req: Request, res: Response) => {
//     try {
//         const userEmail = (req as any).user?.email;

//         // Find the user by email
//         const userField = await User.findOne({ email: userEmail });
//         if (!userField) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         // Find bookings for the user using their _id
//         const findAUserBookings = await Booking.find({ user: userField._id })
//             .populate({
//                 path: 'facility',
//                 select: 'name description pricePerHour location isDeleted',
//             })
//             // .populate({
//             //     path: 'user',
//             //     select: 'name email phone role address',
//             // })
//             .exec();

//         // Check if there are any bookings
//         if (!findAUserBookings || findAUserBookings.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No bookings found for this user',
//             });
//         }

//         // Send success response with bookings
//         res.status(200).json({
//             success: true,
//             message: "Bookings retrieved successfully",
//             data: findAUserBookings,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while retrieving bookings",
//         });
//     }
// };



export const BookingControllers = {
    bookingAFacility,
    getAllBookings,
    getBookingByUser
}