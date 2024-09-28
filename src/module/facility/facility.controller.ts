import { NextFunction, Request, Response } from "express"
import { facilityServices } from "./facility.service";
import { catchAsync } from "../../utils/catchAsync";


const createFacility = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const facilityData = req.body;
        const result = await facilityServices.createFacilityIntoDB(facilityData)  
        res.status(200).json({
            success:true,
            statusCode: 200,
            message: 'facility is created successfully',
            data: result
        })
    } catch (error) {
        next()
        // res.status(200).json({
        //     success:true,
        //     statusCode: 500,
        //     error: (error as any).message     
        // })
    }
} 

const getAllFacilities = async(req: Request, res: Response)=>{

    try {
        const result = await facilityServices.getAllFacilitiesFromDB()  
        res.status(200).json({
            success:true,
            statusCode: 200,
            message: 'Facilities retrieved successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            statusCode: 500,
            error,
        })
    }
} 
const updateAFacility = async(req: Request, res: Response)=>{

    try {
        const facilityId = req.params.id;
        const updateData = req.body;
        const result = await facilityServices.findAndUpdateFacilityIntoDB(facilityId, updateData)  
        res.status(200).json({
            success:true,
            statusCode: 200,
            message: 'facility updated successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            statusCode: 500,
            error,
        })
    }
} 
const deleteAFacility = async(req: Request, res: Response)=>{

    try {
        const facilityId = req.params.id;
        console.log(facilityId, "facilityId");
        const result = await facilityServices.deleteAFacilityIntoDB(facilityId)  
        res.status(200).json({
            success:true,
            statusCode: 200,
            message: 'Facility deleted successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            statusCode: 500,
            error,
   
        })
    }
} 

export const facilityController = {
    createFacility,
    getAllFacilities,
    updateAFacility,
    deleteAFacility
}