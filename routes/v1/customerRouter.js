"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const customer_1 = require("../../controllers/customer");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => await customer_1.customerController.registerCUstomer(req, res));
router.post('/login', async (req, res) => await customer_1.customerController.loginCustomer(req, res));
router.patch('/update-password', middlewares_1.middleware.useAuthorization, async (req, res) => await customer_1.customerController.updatePassword(req, res));
router.patch('/update-password/public', async (req, res) => await customer_1.customerController.updatePasswordPublic(req, res));
router.post('/request-otp', async (req, res) => await customer_1.customerController.requestOtp(req, res));
router.post('/request-otp-update-password', async (req, res) => await customer_1.customerController.requestOtpUpdatePassword(req, res));
router.post('/verify-otp', async (req, res) => await customer_1.customerController.verifyOtp(req, res));
router.post('/select-member', async (req, res) => await customer_1.customerController.selectMember(req, res));
router.post('/point-histories', async (req, res) => await customer_1.customerController.pointHistory(req, res));
exports.default = router;
