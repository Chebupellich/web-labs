import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const CategoryModel = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

export default CategoryModel;
