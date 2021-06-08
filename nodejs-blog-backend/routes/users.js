const express = require('express');
const UserController = require('../controllers/UserController');
const isAuthenticated = require('../isAuthenticated')

const router = express.Router();

// Register an accout
router.post('/register',
    UserController.register
);

// Login to an account
router.post('/login',
    UserController.login
);

// Get user info
router.get('/user/:userId',
    UserController.getUser
);

// Change user email
router.put('/changeEmail',
    isAuthenticated,
    UserController.changeEmail
);

// Change user password
router.put('/changePassword',
    isAuthenticated,
    UserController.changePassword
);

module.exports = router;