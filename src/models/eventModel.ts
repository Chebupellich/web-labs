import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import { sequelize } from '@config/db';
import { User } from './userModel.js';

enum Categories {
    Concert = 'Concert',
    Lecture = 'Lecture',
    Exhibition = 'Exhibition',
}

class Event extends Model<
    InferAttributes<Event>,
    InferCreationAttributes<Event>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string | null;
    declare date: Date;
    declare createdBy: ForeignKey<User['id']>;
    declare category: Categories;

    declare owner?: NonAttribute<User>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        category: {
            type: DataTypes.ENUM,
            values: Object.values(Categories),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'events',
        timestamps: true,
    },
);

export { Event, Categories };
