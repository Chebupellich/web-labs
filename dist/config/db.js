"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_js_1 = __importDefault(require("./config.js"));
const sequelize = new sequelize_1.Sequelize(config_js_1.default.db.dbDefaultName, config_js_1.default.db.user, config_js_1.default.db.password, {
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
});
exports.sequelize = sequelize;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.authenticate();
    const result = yield sequelize.query(`
            SELECT 1 FROM pg_database WHERE datname = '${config_js_1.default.db.dbName}';
        `);
    if (result[0].length === 0) {
        yield sequelize.query(`CREATE DATABASE ${config_js_1.default.db.dbName};`);
        console.log(`Database ${config_js_1.default.db.dbName} created successfully.`);
    }
    else {
        console.log(`Database ${config_js_1.default.db.dbName} already exists.`);
    }
    yield sequelize.authenticate();
    yield sequelize.sync({ force: false });
    console.log('db Connected');
});
exports.connectDB = connectDB;
