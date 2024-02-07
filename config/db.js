import { Sequelize } from 'sequelize';

export default new Sequelize('book-management', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});
