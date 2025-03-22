"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const promotion_1 = require("../../controllers/promotion");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    await promotion_1.promotionController.findAll(req, res);
});
router.get('/detail/:promotionId', async (req, res) => {
    await promotion_1.promotionController.findOne(req, res);
});
router.post('/', async (req, res) => await promotion_1.promotionController.create(req, res));
router.patch('/', async (req, res) => await promotion_1.promotionController.update(req, res));
router.delete('/', async (req, res) => await promotion_1.promotionController.remove(req, res));
exports.default = router;
