const Sequelize = require('sequelize');
const db = require('./index');

const Post = db.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        require: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(50),
        require: true
    },
    body: {
        type: Sequelize.STRING(500),
        require: true
    },
    author_id: {
        type: Sequelize.INTEGER,
        require: true
    },
    author_name: {
        type: Sequelize.STRING,
        require: true
    }
}, {
    timestamps: false
});

module.exports = Post;