"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = void 0;
const login_1 = require("./login");
const pointHistory_1 = require("./pointHistory");
const register_1 = require("./register");
const requestOtp_1 = require("./requestOtp");
const requestOtpUpdatePassword_1 = require("./requestOtpUpdatePassword");
const selectMember_1 = require("./selectMember");
const updatePassword_1 = require("./updatePassword");
const verifyOtp_1 = require("./verifyOtp");
exports.customerController = {
    registerCUstomer: register_1.registerCUstomer,
    requestOtp: requestOtp_1.requestOtp,
    requestOtpUpdatePassword: requestOtpUpdatePassword_1.requestOtpUpdatePassword,
    updatePassword: updatePassword_1.updatePassword,
    updatePasswordPublic: updatePassword_1.updatePasswordPublic,
    verifyOtp: verifyOtp_1.verifyOtp,
    loginCustomer: login_1.loginCustomer,
    selectMember: selectMember_1.selectMember,
    pointHistory: pointHistory_1.pointHistory
};
