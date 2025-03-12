import { Sequelize } from 'sequelize';
import { config } from './config.js';

const sequelize = new Sequelize(
    config.db.dbDefaultName,
    config.db.user,
    config.db.password,
    {
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            freezeTableName: true,
        },
        timezone: '+00:00',
    },
);

const connectDB = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    console.log('db Connected');
};

export { sequelize, connectDB };
