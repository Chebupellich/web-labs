"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_js_1 = require("../config/db.js");
const userModel_js_1 = __importDefault(require("./userModel.js"));
const categoryModel_js_1 = __importDefault(require("./categoryModel.js"));
class EventModel extends sequelize_1.Model {
}
EventModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel_js_1.default,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: categoryModel_js_1.default,
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
}, {
    sequelize: db_js_1.sequelize,
    tableName: 'events',
    timestamps: true,
});
EventModel.belongsTo(userModel_js_1.default, { foreignKey: 'createdBy' });
EventModel.belongsTo(categoryModel_js_1.default, { foreignKey: 'categoryId' });
exports.default = EventModel;
