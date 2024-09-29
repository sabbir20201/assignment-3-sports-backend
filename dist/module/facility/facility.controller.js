"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityController = void 0;
const facility_service_1 = require("./facility.service");
const createFacility = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facilityData = req.body;
        const result = yield facility_service_1.facilityServices.createFacilityIntoDB(facilityData);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'facility is created successfully',
            data: result
        });
    }
    catch (error) {
        next();
        // res.status(200).json({
        //     success:true,
        //     statusCode: 500,
        //     error: (error as any).message     
        // })
    }
});
const getAllFacilities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield facility_service_1.facilityServices.getAllFacilitiesFromDB();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Facilities retrieved successfully',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            error,
        });
    }
});
const updateAFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facilityId = req.params.id;
        const updateData = req.body;
        const result = yield facility_service_1.facilityServices.findAndUpdateFacilityIntoDB(facilityId, updateData);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'facility updated successfully',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            error,
        });
    }
});
const deleteAFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facilityId = req.params.id;
        console.log(facilityId, "facilityId");
        const result = yield facility_service_1.facilityServices.deleteAFacilityIntoDB(facilityId);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Facility deleted successfully',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            error,
        });
    }
});
exports.facilityController = {
    createFacility,
    getAllFacilities,
    updateAFacility,
    deleteAFacility
};
