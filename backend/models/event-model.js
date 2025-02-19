const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserModel = require('./user-model');

const EventModel = sequelize.define('events', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    category: {
        type: DataTypes.ENUM,
        values: ['концерт', 'лекция', 'выставка'],
        allowNull: false,
    }
});

EventModel.belongsTo(UserModel, { foreignKey: 'createdBy' });

module.exports = EventModel;
