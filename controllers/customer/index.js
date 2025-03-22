"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = void 0;
const login_1 = require("./login");
const register_1 = require("./register");
const requestOtpRegister_1 = require("./requestOtpRegister");
const requestOtpUpdatePassword_1 = require("./requestOtpUpdatePassword");
const updatePassword_1 = require("./updatePassword");
const verifyOtp_1 = require("./verifyOtp");
exports.customerController = {
    registerCUstomer: register_1.registerCUstomer,
    requestOtpRegister: requestOtpRegister_1.requestOtpRegister,
    requestOtpUpdatePassword: requestOtpUpdatePassword_1.requestOtpUpdatePassword,
    updatePassword: updatePassword_1.updatePassword,
    verifyOtp: verifyOtp_1.verifyOtp,
    loginCustomer: login_1.loginCustomer
};
