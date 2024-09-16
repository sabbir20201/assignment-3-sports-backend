import { Request, Response } from "express"
import { facilityServices } from "./facility.service";


const createFacility = async(req: Request, res: Response)=>{

    try {
        const facilityData = req.body;
        const result = await facilityServices.createFacilityIntoDB(facilityData)  
        res.status(200).json({
            success:true,
            message: 'facility is created successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'facility is created successfully',
            error,
        })
    }
} 
const getAllFacilities = async(req: Request, res: Response)=>{

    try {
        const result = await facilityServices.getAllFacilitiesFromDB()  
        res.status(200).json({
            success:true,
            statusCode: 200,
            message: 'all facilities retrieved successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'facility is not getting successfully',
            error,
        })
    }
} 
const updateAFacility = async(req: Request, res: Response)=>{

    try {
        const facilityId = req.params.id;
        console.log(facilityId, "facilityId");
        
        const updateData = req.body;
        const result = await facilityServices.findAndUpdateFacilityIntoDB(facilityId, updateData)  
        res.status(200).json({
            success:true,
            statusCode: 200,
            message: 'all facilities retrieved successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'facility is not getting successfully',
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
            message: 'all deleted retrieved successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'facility is not delete successfully',
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