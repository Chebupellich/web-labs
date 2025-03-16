import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import { sequelize } from '@config/dbConfig.js';
import { User } from './user.js';

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

    declare user?: NonAttribute<User>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.TEXT,
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
