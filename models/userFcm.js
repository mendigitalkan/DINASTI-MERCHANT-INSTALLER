"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFcmModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.UserFcmModel = _1.sequelize.define('UserFcm', {
    ...zygote_1.ZygoteModel,
    userFcmId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'user_fcm',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
