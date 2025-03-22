"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const notifications_1 = require("../../controllers/notifications");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => await notifications_1.notificationController.findAll(req, res));
router.get('/detail/:userFcmId', middlewares_1.middleware.useAuthorization, async (req, res) => await notifications_1.notificationController.findOne(req, res));
router.post('/', async (req, res) => await notifications_1.notificationController.create(req, res));
router.patch('/', async (req, res) => await notifications_1.notificationController.update(req, res));
router.patch('/push-token', async (req, res) => await notifications_1.notificationController.updatePushToken(req, res));
router.delete('/', async (req, res) => await notifications_1.notificationController.remove(req, res));
exports.default = router;
