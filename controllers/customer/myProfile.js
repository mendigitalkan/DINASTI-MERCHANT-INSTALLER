"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const customer_1 = require("../../models/customer");
const myProfile = async (req, res) => {
    try {
        const user = await customer_1.CustomerModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                telp: { [sequelize_1.Op.eq]: req.body?.user?.telp }
            },
            attributes: [
                'kode',
                'cardid',
                'nama',
                'alamat',
                'kota',
                'telp',
                'ktp',
                'toko',
                'tgllahir',
                'createdAt',
                'updatedAt'
            ]
        });
        if (user == null) {
            const message = 'User not found!';
            logger_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success(user);
        logger_1.default.info('Fetched user  successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.myProfile = myProfile;
