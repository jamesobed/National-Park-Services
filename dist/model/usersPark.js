"use strict";
const { Model, DataTypes } = require("sequelize");
const db = require("../config/database.config");

class usersParkInstance extends Model {
}

usersParkInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        parkId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parkName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parkLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
    },
    {
        sequelize: db,
        modelName: "usersPark",
        tableName: "usersPark",
    }
);

module.exports = usersParkInstance;