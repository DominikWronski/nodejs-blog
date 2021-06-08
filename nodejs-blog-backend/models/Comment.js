const Sequelize = require('sequelize');
const db = require('./index');

const Comment = db.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        require: true,
        primaryKey: true
    },
    post_id: {
        type: Sequelize.INTEGER,
        require: true,
    },
    author_id: {
        type: Sequelize.INTEGER,
        require: true
    },
    author_name: {
        type: Sequelize.STRING(100),
        require: true
    },
    body: {
        type: Sequelize.STRING(100),
        require: true
    }
}, {
    timestamps: false
});

module.exports = Comment;