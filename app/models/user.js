import sequelize from 'sequelize';
import db from '../../config/db.js';

const User = db.define('User', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize.TEXT
    },
    password: {
        type: sequelize.TEXT
    }
}, {
    freezeTableName: true,
});

export default User;