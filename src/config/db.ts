import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize(
    config.db.dbDefaultName,
    config.db.user,
    config.db.password,
    {
        dialect: 'postgres',
        logging: false,
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        timezone: '+00:00',
    },
);

const connectDB = async () => {
    await sequelize.authenticate();

    const result = await sequelize.query(`
            SELECT 1 FROM pg_database WHERE datname = '${config.db.dbName}';
        `);

    if (result[0].length === 0) {
        await sequelize.query(`CREATE DATABASE ${config.db.dbName};`);
        console.log(`Database ${config.db.dbName} created successfully.`);
    } else {
        console.log(`Database ${config.db.dbName} already exists.`);
    }
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('db Connected');
};

export { sequelize, connectDB };
