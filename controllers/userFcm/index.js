"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFcmController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const findOne_1 = require("./findOne");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.userFcmController = {
    findAll: find_1.findAllUserFcm,
    findOne: findOne_1.findOneUserFcm,
    create: create_1.createUserFcm,
    update: update_1.updateUserFcm,
    remove: remove_1.removeUserFcm
};
