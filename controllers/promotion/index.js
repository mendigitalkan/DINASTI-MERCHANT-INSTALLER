"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.promotionController = {
    create: create_1.createPromotion,
    findAll: find_1.findAllPromotion,
    findOne: find_1.findOnePromotion,
    remove: remove_1.removePromotion,
    update: update_1.updatePromotion
};
