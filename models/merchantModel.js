"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.MerchantModel = _1.sequelize.define('Merchant', {
    ...zygote_1.ZygoteModel,
    merchantId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    merchantName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    merchantLogo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'merchants',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
