import { DataTypes } from "sequelize"
import { sequelize } from "../config/db.js"

const UserModel = sequelize.define('app_users', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        defaultValue: '',
    },
    failedAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lockedUntil: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

export default UserModel
