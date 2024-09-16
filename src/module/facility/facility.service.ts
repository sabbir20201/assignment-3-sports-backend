import { Request, Response } from "express";
import { Facility } from "./facility.model";
import { TFacility } from "./facility.interface";
import { User } from "../user/user.model";


const createFacilityIntoDB = async(payload: TFacility)=>{
    // const role = await User.findOne({role: role})
    // console.log(role, 'roleee');
    
    const facility = new Facility(payload)
 
    const result = facility.save()
    return result
}
const getAllFacilitiesFromDB = async()=>{
    const result = await Facility.find({isDeleted: false})
    return result
}

const  findAndUpdateFacilityIntoDB = async( id: string, payload: TFacility)=>{
    const updateFacility = await Facility.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return updateFacility
}
const deleteAFacilityIntoDB  = async( id: string)=>{
    const deleteFacility = await Facility.findByIdAndUpdate(id,{isDeleted: true}, {new: true})
    return deleteFacility
}

export const facilityServices  = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    findAndUpdateFacilityIntoDB,
    deleteAFacilityIntoDB
}