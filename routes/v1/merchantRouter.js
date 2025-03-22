"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const merchant_1 = require("../../controllers/merchant");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => await merchant_1.merchantController.findAll(req, res));
router.get('/detail/:merchantId', async (req, res) => await merchant_1.merchantController.findOne(req, res));
router.post('/', async (req, res) => await merchant_1.merchantController.create(req, res));
router.patch('/', async (req, res) => await merchant_1.merchantController.update(req, res));
router.delete('/', async (req, res) => await merchant_1.merchantController.remove(req, res));
exports.default = router;
