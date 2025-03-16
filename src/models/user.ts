import {
    Association,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import { sequelize } from '@config/dbConfig.js';
import { Event } from '@models/event.js';

class User extends Model<
    InferAttributes<User, { omit: 'events' }>,
    InferCreationAttributes<User, { omit: 'events' }>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare failedAttempts: number;
    declare lockedUntil: Date | null;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare events?: NonAttribute<Event[]>;

    declare static associations: {
        events: Association<User, Event>;
    };
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'users',
        timestamps: true,
        sequelize,
    },
);

export { User };
