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
exports.facilityServices = void 0;
const facility_model_1 = require("./facility.model");
const createFacilityIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = new facility_model_1.Facility(payload);
    const result = facility.save();
    return result;
});
const getAllFacilitiesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.find();
    return result;
});
const updateFacilityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updateFacility = yield facility_model_1.Facility.findByIdAndUpdate(id, payload);
    return updateFacility;
});
exports.facilityServices = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    updateFacilityIntoDB
};
