const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    // @desc Register a new account
    // @route POST /api/v1/users/register
    // @access Public
    async register (req, res) {
        try {
            // check if req.body is empty, or if password is weak (TODO)
            const emailExists = await User.findOne({ where: { email: req.body.email }})
            const usernameExists = await User.findOne({ where: { username: req.body.username }})
            if(emailExists) {
                res.status(409).send('Account with this email is already registered.');
            } else if (usernameExists) {
                res.status(409).send('Account with this username is already registered.');
            } else {
                const user = await User.create({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                })
                res.status(201).send({user, res: 'Account has been created successfully'})
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong.")
        }
    },

    // @desc Login to an account
    // @route POST /api/v1/users/login
    // @access Public
    async login (req, res) {
        try {
            const user = await User.findOne({ where: { email: req.body.email }})
            if(!user) {
                res.status(404).send('Email not found')
            } else {
                const isPasswordValid = await user.comparePassword(req.body.password)
                if(!isPasswordValid) {
                        res.status(403).send('Wrong password')
                    } else {

                        //Create and assign a token // To do change expiresIn time
                        const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET, { expiresIn: 86400 })
                        // res.header('auth-token', token).send(token);
                        res.send({
                            token,
                            user
                        });
                        // res.header('auth-token', token).send(user);
                    }
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong.')
        }
    },

    // @desc Show user public informations
    // @route GET /api/v1/users/user/:userId
    // @access Public
    async getUser (req, res) {
        try {
            const user = await User.findOne({where: { id: req.params.userId }})
            if(user) {
                res.send({ id: user.dataValues.id, username: user.dataValues.username})
            } else {
                res.status(404).send("There is no user with this id.")
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong.")
        }
    },

    // @desc Change user email
    // @route PUT /api/v1/users/changeEmail
    // @access Private
    async changeEmail (req, res) {
        try {
            const tokenJWT = (req.headers.authorization).replace('Bearer ', '');
            const decodedJWT = await jwt.verify(tokenJWT, process.env.TOKEN_SECRET)

            if(decodedJWT) {
                const user = await User.findOne({where: { id: decodedJWT.id }})
                if(user) {
                    user.update(
                        {email: req.body.email},
                        {where: {id: decodedJWT.id}}
                    )
                } else {
                    res.status(404).send("There is no user with this id.")
                }
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong.")
        }
    },

    // @desc Change user password
    // @route PUT /api/v1/users/changePassword
    // @access Private
    async changePassword (req, res) {
        try {
            const tokenJWT = (req.headers.authorization).replace('Bearer ', '');
            const decodedJWT = await jwt.verify(tokenJWT, process.env.TOKEN_SECRET)

            if(decodedJWT) {
                const user = await User.findOne({where: { id: decodedJWT.id }})
                if(user) {
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        if(err) {
                            console.log(err);
                        } else {
                            user.update(
                                {password: hash},
                                {where: {id: decodedJWT.id}}
                            )
                        }
                    });
                } else {
                    res.status(404).send("There is no user with this id.")
                }
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong.")
        }
    }
}