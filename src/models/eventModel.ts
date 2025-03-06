import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db';
import UserModel from './userModel.js';
import CategoryModel from './categoryModel.js';

interface EventAttributes {
    id: number;
    title: string;
    description: string | null;
    date: Date;
    createdBy: number;
    categoryId: number | null;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {
    // Этот интерфейс может быть расширен в будущем
}

class EventModel
    extends Model<EventAttributes, EventCreationAttributes>
    implements EventAttributes
{
    public id!: number;
    public title!: string;
    public description!: string | null;
    public date!: Date;
    public createdBy!: number;
    public categoryId!: number | null;
}

EventModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
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
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: CategoryModel,
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
    },
    {
        sequelize,
        tableName: 'events',
        timestamps: true,
    },
);

EventModel.belongsTo(UserModel, { foreignKey: 'createdBy' });
EventModel.belongsTo(CategoryModel, { foreignKey: 'categoryId' });

export default EventModel;
