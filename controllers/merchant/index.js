"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merchantController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const findOne_1 = require("./findOne");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.merchantController = {
    findAll: find_1.findAllMerchant,
    findOne: findOne_1.findOneMerchant,
    create: create_1.createMerchant,
    update: update_1.updateMerchant,
    remove: remove_1.removeMerchant
};
