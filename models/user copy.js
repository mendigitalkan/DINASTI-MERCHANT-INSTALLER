"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
// Define the UserModel
exports.UserModel = _1.sequelize.define('User', {
    ...zygote_1.ZygoteModel,
    userId: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM('admin', 'superAdmin'),
        allowNull: false,
        defaultValue: 'admin'
    }
}, {
    tableName: 'users',
    timestamps: true, // Setting timestamps to true for createdAt and updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
    underscored: true, // Converts camelCase to snake_case for columns
    freezeTableName: true, // Disables plural table names
    engine: 'InnoDB'
});
