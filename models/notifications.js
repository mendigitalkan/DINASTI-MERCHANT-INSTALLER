"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.NotificationModel = _1.sequelize.define('notifications', {
    ...zygote_1.ZygoteModel,
    notificationId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    notificationName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    notificationMessage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'notifications',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
