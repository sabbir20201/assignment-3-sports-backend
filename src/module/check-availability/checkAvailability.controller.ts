// import { Request, Response } from "express";
// import { catchAsync } from "../../utils/catchAsync";
// import { Booking } from "../booking/booking.model";

// const checkAvailability = catchAsync(async (req: Request, res: Response) => {
//     const dateParam = req.query.date as string || new Date().toISOString().split('T')[0];
//     const date = new Date(dateParam);
//         console.log("dateParam =>", dateParam);
//         console.log("date =>", date);

//     const bookings = await Booking.find({ date }).select("startTime endTime");
//     console.log("bookings =>", bookings);

//     const totalSlots = [
//         { startTime: "08:00", endTime: "10:00" },
//         { startTime: "10:00", endTime: "12:00" },
//         { startTime: "12:00", endTime: "14:00" },
//         { startTime: "14:00", endTime: "16:00" },
//         { startTime: "16:00", endTime: "18:00" },
//     ];
//     console.log("totalSlots =>", totalSlots);

//     const unavailableSlots = bookings.map(booking => ({

//         startTime: booking.startTime,
//         endTime: booking.endTime,
//     }));
//     console.log("unavailableSlots =>", unavailableSlots);

//     const availableSlots = totalSlots.filter(slot => {
//         return !unavailableSlots.some(unavailable => 
//             (slot.startTime < unavailable.endTime && slot.endTime > unavailable.startTime)
//         );
//     });
//     console.log("availableSlots =>", availableSlots);

//     res.status(200).json({
//         success: true,
//         statusCode: 200,
//         message: "Availability checked successfully",
//         data: availableSlots,
//     });
// });

// export const BookingCheckControllers = {
//     checkAvailability,
// };
// import { Request, Response } from "express";
// import { Booking } from "../booking/booking.model";

// const checkAvailability = async (req: Request, res: Response) => {
//     try {
//         const dateParam = req.query.date as string || new Date().toISOString().split('T')[0];
//         const date = new Date(dateParam);
//         console.log("dateParam => ", dateParam);

//         // Retrieve all bookings for the specified date
//         const bookings = await Booking.find({ date }).select("startTime endTime");

//         // Debugging: Log the bookings retrieved
//         console.log('Bookings found:', bookings);

//         const totalSlots = [
//             { startTime: "08:00", endTime: "10:00" },
//             { startTime: "10:00", endTime: "12:00" },
//             { startTime: "12:00", endTime: "14:00" },
//             { startTime: "14:00", endTime: "16:00" },
//             { startTime: "16:00", endTime: "18:00" },
//         ];

//         // Map booked slots to an array of unavailable times
//         const unavailableSlots = bookings.map(booking => ({
//             startTime: booking.startTime,
//             endTime: booking.endTime,
//         }));

//         // Debugging: Log the unavailable slots
//         console.log('Unavailable slots=> :', unavailableSlots);

//         // Function to check if a slot is available
//         const isSlotAvailable = (slot: any) => {
//             return !unavailableSlots.some(unavailable => 
//                 slot.startTime < unavailable.endTime && slot.endTime > unavailable.startTime
//             );
//         };
//         console.log("isSlotAvailable=> ", isSlotAvailable);

//         // Filter available slots based on the bookings
//         const availableSlots = totalSlots.filter(isSlotAvailable);

//         // Debugging: Log the available slots
//         console.log('Available slots:', availableSlots);

//         res.status(200).json({
//             success: true,
//             statusCode: 200,
//             message: "Availability checked successfully",
//             data: availableSlots,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             statusCode: 500,
//             message: "Internal server error",
//         });
//     }
// };

// import { Booking } from "../booking/booking.model"; // Import Booking interface
// import TBooking  from "../booking/booking.interface"
// // Function to check availability for a specific date
// const checkAvailability = async (req: any, res: any) => {
//   try {
//     // Parse the date query parameter (optional)
//     const date = req.query.date || new Date().toISOString().split('T')[0];
//     console.log(date);

//     // Find all bookings for the specified date
//     const bookings: TBooking[] = await Booking.find({ date });
//     console.log("bookings =>", bookings);

//     // Define available time slots (assuming facility operational hours are 9:00 - 18:00)
//     const availableSlots: { startTime: string; endTime: string }[] = [];
//     for (let hour = 9; hour < 18; hour++) {
//       availableSlots.push({
//         startTime: `${hour.toString().padStart(2, '0')}:00`,
//         endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
//       });
//     }

//     // Filter out unavailable time slots based on existing bookings
//     const unavailableSlots = bookings.map((booking: TBooking) => ({
//       startTime: booking.startTime,
//       endTime: booking.endTime,
//     }));
//     console.log("unavailableSlots", unavailableSlots);


//     availableSlots.forEach((slot: { startTime: string; endTime: string }) => {
//       for (const unavailable of unavailableSlots) {
//         if (isTimeSlotConflict(slot, unavailable)) {
//           const index = availableSlots.indexOf(slot);
//           availableSlots.splice(index, 1);
//           break;
//         }
//       }
//     });
//     console.log("availableSlots", availableSlots);
//     // Helper function to check time slot conflict
//     function isTimeSlotConflict(slot1: { startTime: string; endTime: string }, slot2: { startTime: string; endTime: string }) {
//       const startTime1 = new Date(`2024-10-27T${slot1.startTime}:00`); // Replace with actual year
//       const endTime1 = new Date(`2024-10-27T${slot1.endTime}:00`); // Replace with actual year
//       const startTime2 = new Date(`2024-10-27T${slot2.startTime}:00`); // Replace with actual year
//       const endTime2 = new Date(`2024-10-27T${slot2.endTime}:00`); // Replace with actual year

//       return (
//         (startTime1 < endTime2 && startTime1 >= startTime2) ||
//         (endTime1 > startTime2 && endTime1 <= endTime2) ||
//         (startTime1 < startTime2 && endTime1 > endTime2)
//       );
//     }

//     res.json({
//       success: true,
//       statusCode: 200,
//       message: 'Availability checked successfully',
//       data: availableSlots,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       statusCode: 500,
//       message: 'Internal server error',
//     });
//   }
// };

// export default checkAvailability; // Update export for modules
// import { Booking } from "../booking/booking.model"; // Import Booking interface
// import {TBooking} from "../booking/booking.interface"
// Function to check availability for a specific date

// const checkAvailability = async (req: any, res: any) => {
//   try {
// // final code 
//     // Parse the date query parameter (optional)
//     const date = req.query.date || new Date().toISOString().split('T')[0];

//     // Find all bookings for the specified date
//     const bookings: TBooking[] = await Booking.find({ date: date });

//     // Define available time slots (assuming facility operational hours are 08:00 - 18:00)
//     const availableSlots: { startTime: string; endTime: string }[] = [
//       { startTime: '08:00', endTime: '10:00' },
//       { startTime: '10:00', endTime: '12:00' },
//       { startTime: '12:00', endTime: '14:00' },
//       { startTime: '14:00', endTime: '16:00' },
//       { startTime: '16:00', endTime: '18:00' },
//     ];

//     // Filter out unavailable time slots based on existing bookings
//     const unavailableSlots = bookings.map((booking: TBooking) => ({
//       startTime: booking.startTime,
//       endTime: booking.endTime,
//     }));

//     availableSlots.forEach((slot: { startTime: string; endTime: string }) => {
//       for (const unavailable of unavailableSlots) {
//         if (isTimeSlotConflict(slot, unavailable)) {
//           const index = availableSlots.indexOf(slot);
//           availableSlots.splice(index, 1);
//           break;
//         }
//       }
//     });

//     // Helper function to check time slot conflict
//     // function isTimeSlotConflict(slot1: { startTime: string; endTime: string }, slot2: { startTime: string; endTime: string }) {
//     //   const startTime1 = new Date(`2024-10-27T${slot1.startTime}:00`); // Replace with actual year
//     //   const endTime1 = new Date(`2024-10-27T${slot1.endTime}:00`); // Replace with actual year
//     //   const startTime2 = new Date(`2024-10-27T${slot2.startTime}:00`); // Replace with actual year
//     //   const endTime2 = new Date(`2024-10-27T${slot2.endTime}:00`); // Replace with actual year

//     //   return (
//     //     (startTime1 < endTime2 && startTime1 >= startTime2) ||
//     //     (endTime1 > startTime2 && endTime1 <= endTime2) ||
//     //     (startTime1 < startTime2 && endTime1 > endTime2)
//     //   );
//     // }
//     // function isTimeSlotConflict(slot1: { startTime: string; endTime: string }, slot2: { startTime: string; endTime: string }) {
//     //   const startTime1 = new Date(`${date}T${slot1.startTime}:00`); // req.query.date থেকে তারিখ আসবে
//     //   const endTime1 = new Date(`${date}T${slot1.endTime}:00`);
//     //   const startTime2 = new Date(`${date}T${slot2.startTime}:00`);
//     //   const endTime2 = new Date(`${date}T${slot2.endTime}:00`);

//     //   return (
//     //     (startTime1 < endTime2 && startTime1 >= startTime2) ||
//     //     (endTime1 > startTime2 && endTime1 <= endTime2) ||
//     //     (startTime1 < startTime2 && endTime1 > endTime2)
//     //   );
//     // }
//     function isTimeSlotConflict(slot1: { startTime: string; endTime: string }, slot2: { startTime: string; endTime: string }) {
//       // const dateString = req.query.date || new Date().toISOString().split('T')[0];
//       const startTime1 = new Date(`${date}T${slot1.startTime}:00`);
//       const endTime1 = new Date(`${date}T${slot1.endTime}:00`);
//       const startTime2 = new Date(`${date}T${slot2.startTime}:00`);
//       const endTime2 = new Date(`${date}T${slot2.endTime}:00`);

//       return (
//             (startTime1 < endTime2 && startTime1 >= startTime2) ||
//             (endTime1 > startTime2 && endTime1 <= endTime2) ||
//             (startTime1 < startTime2 && endTime1 > endTime2)
//           );
//     }

//     res.json({
//       success: true,
//       statusCode: 200,
//       message: `${date === new Date().toISOString().split('T')[0]? 'today slot': ''} Availability checked successfully`,
//       data: availableSlots,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       statusCode: 500,
//       message: 'Internal server error',
//     });
//   }
// };

// export default checkAvailability;
// import { Booking } from "../booking/booking.model";
// import { TBooking } from "../booking/booking.interface"
// import moment from "moment";

// // const checkAvailability = async (req: any, res: any) => {
// //   try {
// //     // Parse the date query parameter (optional)
// //     const date = req.query.date || moment().format('YYYY-MM-DD');

// //     // Find all bookings for the specified date
// //     const bookings: TBooking[] = await Booking.find({ date: date });

// //     // Define available time slots (assuming facility operational hours are 08:00 - 18:00)
// //     const availableSlots: { startTime: string; endTime: string }[] = [
// //       { startTime: '08:00', endTime: '10:00' },
// //       { startTime: '10:00', endTime: '12:00' },
// //       { startTime: '12:00', endTime: '14:00' },
// //       { startTime: '14:00', endTime: '16:00' },
// //       { startTime: '16:00', endTime: '18:00' },
// //     ];

// //     // Filter out unavailable time slots based on existing bookings
// //     const unavailableSlots = bookings.map((booking: TBooking) => ({
// //       startTime: booking.startTime,
// //       endTime: booking.endTime,
// //     }));

// //     availableSlots.forEach((slot: { startTime: string; endTime: string }) => {
// //       for (const unavailable of unavailableSlots) {
// //         const slotStartTime = moment(`${date} ${slot.startTime}`, 'YYYY-MM-DD HH:mm');
// //         const slotEndTime = moment(`${date} ${slot.endTime}`, 'YYYY-MM-DD HH:mm');
// //         const unavailableStartTime = moment(`${date} ${unavailable.startTime}`, 'YYYY-MM-DD HH:mm');
// //         const unavailableEndTime = moment(`${date} ${unavailable.endTime}`, 'YYYY-MM-DD HH:mm');

// //         if (isTimeSlotConflict(slotStartTime, slotEndTime, unavailableStartTime, unavailableEndTime)) {
// //           const index = availableSlots.indexOf(slot);
// //           availableSlots.splice(index, 1);
// //           break;
// //         }
// //       }
// //     });

// //     // Helper function to check time slot conflict
// //     function isTimeSlotConflict(slotStartTime: moment.Moment, slotEndTime: moment.Moment, unavailableStartTime: moment.Moment, unavailableEndTime: moment.Moment) {
// //       return (
// //         (slotStartTime.isBefore(unavailableEndTime) && slotStartTime.isAfter(unavailableStartTime)) ||
// //         (slotEndTime.isAfter(unavailableStartTime) && slotEndTime.isBefore(unavailableEndTime)) ||
// //         (slotStartTime.isBefore(unavailableStartTime) && slotEndTime.isAfter(unavailableEndTime))
// //       );
// //     }

// //     res.json({
// //       success: true,
// //       statusCode: 200,
// //       message: `${date === moment().format('YYYY-MM-DD') ? 'today slot' : ''} Availability checked successfully`,
// //       data: availableSlots,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       statusCode: 500,
// //       message: 'Internal server error',
// //     });
// //   }
// // };

// const checkAvailability = async (req: any, res: any) => {
//   try {
//     // Parse the date query parameter (optional)
//     const date = req.query.date || moment().format('YYYY-MM-DD');

//     // Find all bookings for the specified date
//     const bookings: TBooking[] = await Booking.find({ date: date });

//     // Define available time slots (assuming facility operational hours are 08:00 - 18:00)
//     const availableSlots: { startTime: string; endTime: string }[] = [
//       { startTime: '08:00', endTime: '10:00' },
//       { startTime: '10:00', endTime: '12:00' },
//       { startTime: '12:00', endTime: '14:00' },
//       { startTime: '14:00', endTime: '16:00' },
//       {
//         startTime: '16:00', endTime: '18:00'
//       },
//     ];

//     // Filter out unavailable time slots based on existing bookings
//     const unavailableSlots = bookings.map((booking: TBooking) => ({
//       startTime: booking.startTime,
//       endTime: booking.endTime,
//     }));

//     availableSlots.forEach((slot) => {
//       for (const unavailable of unavailableSlots) {
//         const slotStartTime = moment(`${date} ${slot.startTime}`, 'YYYY-MM-DD HH:mm');
//         const slotEndTime = moment(`${date} ${slot.endTime}`, 'YYYY-MM-DD HH:mm');
//         const unavailableStartTime = moment(`${date} ${unavailable.startTime}`, 'YYYY-MM-DD HH:mm');
//         const unavailableEndTime = moment(`${date} ${unavailable.endTime}`, 'YYYY-MM-DD HH:mm');

//         if (isTimeSlotConflict(slotStartTime, slotEndTime, unavailableStartTime, unavailableEndTime)) {
//           const index = availableSlots.indexOf(slot);
//           availableSlots.splice(index, 1);
//           break;
//         }
//       }
//     });

//     // Helper function to check time slot conflict
//     function isTimeSlotConflict(slotStartTime: moment.Moment, slotEndTime: moment.Moment, unavailableStartTime: moment.Moment, unavailableEndTime: moment.Moment) {
//       return (
//         (slotStartTime.isBefore(unavailableEndTime) && slotStartTime.isAfter(unavailableStartTime)) ||
//         (slotEndTime.isAfter(unavailableStartTime) && slotEndTime.isBefore(unavailableEndTime)) ||
//         (slotStartTime.isBefore(unavailableStartTime) && slotEndTime.isAfter(unavailableEndTime))
//       );
//     }

//     res.json({
//       success: true,
//       statusCode: 200,
//       message: `${date === moment().format('YYYY-MM-DD') ? 'today slot' : ''} Availability checked successfully`,
//       data: availableSlots
//     })
//   }
//   catch(error) {
//       console.log(error);

//     }
//   }

// export default checkAvailability;
// import { Booking } from "../booking/booking.model"; // Import Booking interface
// import { TBooking } from "../booking/booking.interface";
// import moment from "moment"; // Import Moment.js

// Function to check availability for a specific date
// const checkAvailability = async (req: any, res: any) => {
//   try {
//     // Parse the date query parameter (optional)
//     const date = req.query.date || moment().format('YYYY-MM-DD');

//     // Find all bookings for the specified date
//     const bookings: TBooking[] = await Booking.find({ date: date });

//     // Define available time slots (assuming facility operational hours are 08:00 - 18:00)
//     const availableSlots: { startTime: string; endTime: string }[] = [
//       { startTime: '08:00', endTime: '10:00' },
//       { startTime: '10:00', endTime: '12:00' },
//       { startTime: '12:00', endTime: '14:00' },
//       { startTime: '14:00', endTime: '16:00' },
//       { startTime: '16:00', endTime: '18:00' },
//     ];

//     // Filter out unavailable time slots based on existing bookings
//     const unavailableSlots = bookings.map((booking: TBooking) => ({
//       startTime: booking.startTime,
//       endTime: booking.endTime,
//     }));

//     // Filter available slots
//     availableSlots.forEach((slot: { startTime: string; endTime: string }) => {
//       for (const unavailable of unavailableSlots) {
//         if (isTimeSlotConflict(slot, unavailable)) {
//           const index = availableSlots.indexOf(slot);
//           availableSlots.splice(index, 1);
//           break;
//         }
//       }
//     });

//     // Helper function to check time slot conflict using moment
//     function isTimeSlotConflict(slot1: { startTime: string; endTime: string }, slot2: { startTime: string; endTime: string }) {
//       const startTime1 = moment(`${date}T${slot1.startTime}`);
//       const endTime1 = moment(`${date}T${slot1.endTime}`);
//       const startTime2 = moment(`${date}T${slot2.startTime}`);
//       const endTime2 = moment(`${date}T${slot2.endTime}`);

//       return (
//         (startTime1.isBefore(endTime2) && startTime1.isSameOrAfter(startTime2)) ||
//         (endTime1.isAfter(startTime2) && endTime1.isSameOrBefore(endTime2)) ||
//         (startTime1.isBefore(startTime2) && endTime1.isAfter(endTime2))
//       );
//     }

//     res.json({
//       success: true,
//       statusCode: 200,
//       message: `${date === moment().format('YYYY-MM-DD') ? 'today slot' : ''} Availability checked successfully`,
//       data: availableSlots,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       statusCode: 500,
//       message: 'Internal server error',
//     });
//   }
// };
import { Booking } from "../booking/booking.model"; // Import Booking interface
import { TBooking } from "../booking/booking.interface";
import moment from "moment"; // Import Moment.js

// Function to check availability for a specific date
const checkAvailability = async (req: any, res: any) => {
  try {
    // Parse the date query parameter (optional)
    const dateInput = req.query.date || moment().format('YYYY-MM-DD');
    const date = moment(dateInput, 'YYYY-MM-DD', true); // Use strict format checking

    // Check if the input date is valid
    if (!date.isValid()) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "This is not a valid date",
      });
    }

    // Find all bookings for the specified date
    const bookings: TBooking[] = await Booking.find({ date: date.format('YYYY-MM-DD') });

    // Define available time slots (assuming facility operational hours are 08:00 - 18:00)
    const availableSlots: { startTime: string; endTime: string }[] = [
      { startTime: '08:00', endTime: '10:00' },
      { startTime: '10:00', endTime: '12:00' },
      { startTime: '12:00', endTime: '14:00' },
      { startTime: '14:00', endTime: '16:00' },
      { startTime: '16:00', endTime: '18:00' },
    ];

    // Filter out unavailable time slots based on existing bookings
    const unavailableSlots = bookings.map((booking: TBooking) => ({
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));

    // Filter available slots
    availableSlots.forEach((slot: { startTime: string; endTime: string }) => {
      for (const unavailable of unavailableSlots) {
        if (isTimeSlotConflict(slot, unavailable)) {
          const index = availableSlots.indexOf(slot);
          availableSlots.splice(index, 1);
          break;
        }
      }
    });

    // Helper function to check time slot conflict using moment
    function isTimeSlotConflict(slot1: { startTime: string; endTime: string }, slot2: { startTime: string; endTime: string }) {
      const startTime1 = moment(`${date.format('YYYY-MM-DD')}T${slot1.startTime}`);
      const endTime1 = moment(`${date.format('YYYY-MM-DD')}T${slot1.endTime}`);
      const startTime2 = moment(`${date.format('YYYY-MM-DD')}T${slot2.startTime}`);
      const endTime2 = moment(`${date.format('YYYY-MM-DD')}T${slot2.endTime}`);

      // return (
      //   (startTime1.isBefore(endTime2) && startTime1.isSameOrAfter(startTime2)) ||
      //   (endTime1.isAfter(startTime2) && endTime1.isSameOrBefore(endTime2)) ||
      //   (startTime1.isBefore(startTime2) && endTime1.isAfter(endTime2))
      // );
      const condition1 = startTime1.isBefore(endTime2) && startTime1.isSameOrAfter(startTime2);
      const condition2 = endTime1.isAfter(startTime2) && endTime1.isSameOrBefore(endTime2);
      const condition3 = startTime1.isBefore(startTime2) && endTime1.isAfter(endTime2);

      // Return result of the conditions
      return condition1 || condition2 || condition3;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: `${date.isSame(moment(), 'day') ? 'today slot' : ''} Availability checked successfully`,
      data: availableSlots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};


export default checkAvailability;
