"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const userFcm_1 = require("../../controllers/userFcm");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => await userFcm_1.userFcmController.findAll(req, res));
router.get('/detail/:userFcmId', middlewares_1.middleware.useAuthorization, async (req, res) => await userFcm_1.userFcmController.findOne(req, res));
router.patch('/', async (req, res) => await userFcm_1.userFcmController.update(req, res));
router.delete('/', async (req, res) => await userFcm_1.userFcmController.remove(req, res));
exports.default = router;
