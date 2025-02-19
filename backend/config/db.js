const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "postgres",
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('DB Connected');
    })
    .catch(err => {
        console.error('connection error:', err);
    });

module.exports = sequelize;
