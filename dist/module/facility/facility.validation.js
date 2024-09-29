"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityZodSchemaFile = void 0;
const zod_1 = __importDefault(require("zod"));
const facilityZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, { message: "name is required" }),
    description: zod_1.default.string(),
    pricePerHour: zod_1.default.number(),
    location: zod_1.default.string(),
    isDeleted: zod_1.default.boolean().default(false)
});
exports.facilityZodSchemaFile = {
    facilityZodSchema
};
