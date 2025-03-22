"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
// Define the UserModel
exports.CustomerModel = _1.sequelize.define('Customer', {
    ...zygote_1.ZygoteModel,
    kode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cardid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nama: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    alamat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    kota: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ktp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    toko: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tgllahir: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    isVerify: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    tableName: 'customer',
    timestamps: true, // Setting timestamps to true for createdAt and updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
    underscored: true, // Converts camelCase to snake_case for columns
    freezeTableName: true, // Disables plural table names
    engine: 'InnoDB'
});
