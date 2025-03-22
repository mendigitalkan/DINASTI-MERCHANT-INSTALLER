"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCUstomer = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const scure_password_1 = require("../../utilities/scure_password");
const logger_1 = __importDefault(require("../../utilities/logger"));
const customerSchema_1 = require("../../schemas/customerSchema");
const customer_1 = require("../../models/customer");
const axios_1 = __importDefault(require("axios"));
const configs_1 = require("../../configs");
const registerCUstomer = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(customerSchema_1.cusotmerSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { telp, password } = value;
    console.log(value);
    try {
        const existingUser = await customer_1.CustomerModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                telp: { [sequelize_1.Op.eq]: telp }
            }
        });
        if (existingUser != null) {
            const message = `whatsapp number ${telp} is already registered. Please use another one.`;
            logger_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        const apiResponse = await axios_1.default.post(configs_1.APP_CONFIGS.externalAppUrl + '/inanggota', value, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (apiResponse.status !== 200) {
            throw new Error('Failed to send data to external API');
        }
        const hashedPassword = (0, scure_password_1.hashPassword)(password);
        const newCustomer = {
            ...value,
            password: hashedPassword
        };
        await customer_1.CustomerModel.create(newCustomer);
        logger_1.default.info(`Whatsapp number ${telp} registered successfully`);
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_1.ResponseData.success({ message: 'Registration successful' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.registerCUstomer = registerCUstomer;
