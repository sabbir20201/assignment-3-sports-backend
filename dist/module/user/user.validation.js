"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationByZodExport = exports.userValidationByZod = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
exports.userValidationByZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        phone: zod_1.z.string(),
        role: zod_1.z.nativeEnum(user_constants_1.USER_ROLE),
        address: zod_1.z.string()
    })
});
exports.userValidationByZodExport = {
    userValidationByZod: exports.userValidationByZod
};
