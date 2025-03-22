"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouterV1 = void 0;
const controllers_1 = require("../../controllers");
const userRouter_1 = __importDefault(require("./userRouter"));
const uploadFileRoute_1 = __importDefault(require("./uploadFileRoute"));
const merchantRouter_1 = __importDefault(require("./merchantRouter"));
const statisticRouter_1 = __importDefault(require("./statisticRouter"));
const userFcmRouter_1 = __importDefault(require("./userFcmRouter"));
const notificationRouter_1 = __importDefault(require("./notificationRouter"));
const promotionRouter_1 = __importDefault(require("./promotionRouter"));
const customerRouter_1 = __importDefault(require("./customerRouter"));
const apiVersion = '/api/v1';
const appRouterV1 = (app) => {
    app.get(`${apiVersion}`, async (req, res) => await (0, controllers_1.index)(req, res));
    app.use(`${apiVersion}/users`, userRouter_1.default);
    app.use(`${apiVersion}/files`, uploadFileRoute_1.default);
    app.use(`${apiVersion}/merchants`, merchantRouter_1.default);
    app.use(`${apiVersion}/statistic`, statisticRouter_1.default);
    app.use(`${apiVersion}/user-fcm`, userFcmRouter_1.default);
    app.use(`${apiVersion}/notifications`, notificationRouter_1.default);
    app.use(`${apiVersion}/customers`, customerRouter_1.default);
    app.use(`${apiVersion}/promotions`, promotionRouter_1.default);
};
exports.appRouterV1 = appRouterV1;
