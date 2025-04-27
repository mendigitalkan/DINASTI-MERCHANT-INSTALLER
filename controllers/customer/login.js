"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCustomer = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const scure_password_1 = require("../../utilities/scure_password");
const jwt_1 = require("../../utilities/jwt");
const logger_1 = __importDefault(require("../../utilities/logger"));
const customerSchema_1 = require("../../schemas/customerSchema");
const customer_1 = require("../../models/customer");
const loginCustomer = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(customerSchema_1.loginCustomerSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { telp, password } = value;
    try {
        const user = await customer_1.CustomerModel.findOne({
            where: {
                deleted: 0,
                telp
            }
        });
        if (user == null) {
            const message = 'Account not found. Please register first!';
            logger_1.default.info(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const isPasswordValid = (0, scure_password_1.hashPassword)(password) === user.password;
        if (!isPasswordValid) {
            const message = 'Invalid user name and password combination!';
            logger_1.default.info(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
        }
        const token = (0, jwt_1.generateAccessToken)({
            userId: user.kode,
            userName: user.nama,
            userRole: 'user',
            telp: user.telp
        });
        logger_1.default.info('User logged in successfully');
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ token, ...user.dataValues }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.loginCustomer = loginCustomer;
