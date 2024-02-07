import db from '../../config/db.js';
import sequelize from 'sequelize';

const Book = db.define('Book', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookName: {
        type: sequelize.TEXT,
        allowNull: false
    },
    author: {
        type: sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT
    },
    price: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
});

export default Book;