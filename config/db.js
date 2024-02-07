import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();
export default new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});
