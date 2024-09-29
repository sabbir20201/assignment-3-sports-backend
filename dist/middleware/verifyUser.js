"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const user_constants_1 = require("../module/user/user.constants");
const verifyUser = (req, res, next) => {
    const { role } = req.user;
    console.log(role);
    if (role !== user_constants_1.USER_ROLE.USER) {
        return res.status(303).json({
            success: false,
            message: "Access denied"
        });
    }
    next();
};
exports.verifyUser = verifyUser;
