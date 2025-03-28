"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIGS = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.APP_CONFIGS = {
    appVersion: process.env.APP_VERSION ?? '',
    appSemantic: process.env.APP_SEMANTIC ?? '',
    appMode: process.env.APP_MODE ?? 'development',
    appUrl: process.env.APP_URL,
    externalAppUrl: process.env.EXTERNAL_APP_URL ?? '',
    env: process.env.APP_ENV,
    port: process.env.APP_PORT ?? 8000,
    log: process.env.APP_LOG === 'true',
    ipBlackList: JSON.parse(process.env.IP_BLACK_LIST ?? '[]'),
    secret: {
        keyEncryption: process.env.SECRET_KEY_ENCRYPTION,
        passwordEncryption: process.env.SECRET_PASSWORD_ENCRYPTION,
        pinEncryption: process.env.SECRET_PIN_ENCRYPTION,
        token: process.env.TOKEN_SECRET
    },
    twilio: {
        accountSID: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        verifyService: process.env.TWILIO_VERIFY_SERVICE
    },
    authorization: {
        username: process.env.AUTHORIZATION_USERNAME,
        passsword: process.env.AUTHORIZATION_PASSWORD
    },
    maximumUploadFile: process.env.MAXIMUM_UPLOAD_FILE ?? 1024,
    wablas: {
        apiKey: process.env.WABLAS_API_KEY || '',
        url: process.env.WABLAS_URL || ''
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    dataBase: {
        development: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true'
        },
        testing: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true'
        },
        production: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true'
        }
    }
};
