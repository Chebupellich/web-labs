import { Sequelize } from 'sequelize';
import { appConfig } from './appConfig.js';

const sequelize = new Sequelize(
    appConfig.db.dbDefaultName,
    appConfig.db.user,
    appConfig.db.password,
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

export { sequelize };
