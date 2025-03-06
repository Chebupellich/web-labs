import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db.js';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    failedAttempts: number;
    lockedUntil: Date | null;
}

interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'lockedUntil'> {}

class UserModel
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public failedAttempts!: number;
    public lockedUntil!: Date | null;
    createdAt?: Date;
}

UserModel.init(
    {
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
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        failedAttempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        lockedUntil: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'app_users',
        timestamps: true,
    },
);

export default UserModel;
