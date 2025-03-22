"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const statistic_1 = require("../../controllers/statistic");
const router = (0, express_1.Router)();
router.get('/total', async (req, res) => await statistic_1.statisticController.total(req, res));
exports.default = router;
