import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import UserModel from './userModel.js';
import CategoryModel from './categoryModel.js';

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
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: CategoryModel,
            key: 'id'
        },
        onDelete: 'SET NULL',
    }
})

EventModel.belongsTo(UserModel, { foreignKey: 'createdBy' })
EventModel.belongsTo(CategoryModel, { foreignKey: 'categoryId' })

export default EventModel
