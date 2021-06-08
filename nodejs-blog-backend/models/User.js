const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('./index');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        require: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(30),
        require: true
    },
    password: {
        type: Sequelize.STRING(60),
        require: true
    },
    email: {
        type: Sequelize.STRING(30),
        require: true,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        require: true,
        defaultValue: 0
    }
}, {
    timestamps: false,
    // instanceMethods: {
    //     comparePassword(password) {
    //         return bcrypt.compare(password, this.password);
    //     }
    // }
});

User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  }

User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});

module.exports = User;