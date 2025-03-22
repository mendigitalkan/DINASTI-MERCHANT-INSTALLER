"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.PromotionModel = _1.sequelize.define('Promotion', {
    ...zygote_1.ZygoteModel,
    promotionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    promotionName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    promotionDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'promotion',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
