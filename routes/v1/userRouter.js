"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, async (req, res) => await auth_1.UsersController.findAll(req, res));
router.get('/detail/:userId', middlewares_1.middleware.useAuthorization, async (req, res) => await auth_1.UsersController.findOne(req, res));
router.patch('/', async (req, res) => await auth_1.UsersController.update(req, res));
router.delete('/', async (req, res) => await auth_1.UsersController.remove(req, res));
router.post('/login', async (req, res) => await auth_1.UsersController.login(req, res));
router.post('/register', async (req, res) => await auth_1.UsersController.register(req, res));
router.get('/my-profile', middlewares_1.middleware.useAuthorization, async (req, res) => await auth_1.UsersController.myProfile(req, res));
exports.default = router;
