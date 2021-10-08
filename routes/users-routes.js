const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users-controllers');

const router = express.Router();

// const checkAuth = require('../middleware/check-auth');

// router.use(checkAuth);


// router.post('/signup', usersController.signup);
router.post(
    '/signup',
    [
      check('name')
        .not()
        .isEmpty(),
      check('email')
        .normalizeEmail()
        .isEmail(),
      check('password').isLength({ min: 6 })
    ],
    usersController.signup
  );
  

router.post('/login', usersController.login);


router.get('/users', usersController.getUsers);

module.exports = router;
