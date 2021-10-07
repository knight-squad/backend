const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const generator = aleaRNGFactory(10);


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.findAll({}, '-password');
    res.status(200).json({
      users: users,
  });
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
 
};


const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password, address, contact_no } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  // let user = new User({
  //     password: hashedPassword,
  //     name,
  //     email,
  //     address,
  //     contact_no,
  //     userId:1
  // })

  // try {
  //   await user.create(
  //   );

  try {
    await User.create({
      password: hashedPassword,
      name,
      email,
      address,
      contact_no,
      userId:`Cl${generator.uInt32()}`
    }
    );
    

    console.log("User saved");
    return res.status(200).json({ message: "User created" });
  }
  catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }


    // let token;
    // try {
    //   token = jwt.sign(
    //     { userId: user.id, email: user.email },
    //     'theprivatekey',
    //     { expiresIn: '1h' }
    //   );
    // } catch (err) {
    //   const error = new HttpError(
    //     'Signing up failed, please try again later.',
    //     500
    //   );
    //   return next(error);
    // }
  
    // res
    //   .status(201)
    //   .json({ userId: user.id, email: user.email, token: token });  

};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ 
      where: {
        email: email }});
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'theprivatekey',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });

};

//////////////////////////////////////////////////////////////////////
const getUser = async (req, res, next) => {
  // const user_id = req.params.userId;
  //   try {
  //       const allUsers = await User.findAll({where: {user_id}});
  //       res.status(200).json({
  //           user: allUsers,
  //       });
  //   } catch (err) {
  //       if (!err.statusCode) {
  //           err.statusCode = 500;
  //       }
  //       next(err);
  //   }
  const userId = req.params.uid;
  try{
    const allUsers = await User.findAll({where: {userId}});
    res.status(200).json({
                user: allUsers,
            });
  }
  catch (err) {
    const error = new HttpError(
      'Fetching user failed, please try again later.',
      500
    );
    return next(error);
    }
};


const deleteUser = async (req, res, next) => {
  const user_id = req.params.userId;

  let user = await User.destroy({where: {user_id}}).catch((err) => {
      if (!err.statusCode) {
          err.statusCode = 500;
      }
      next(err);
  });
  if (!user) {
      console.log("user not found");
      res.status(500).json({message: "user not found"});
  } else {
      res.status(200).json({
          user: "Deleted",
      });
  }
};

const updateUser = async (req, res, next) => {
  const {user_id, password, name, contact_no, address} = req.body;
  console.log(user_id);

  const hashedpw = await bcrypt.hash(password, 8).catch((err) => {
      if (!err.statusCode) {
          err.statusCode = 500;
      }
      next(err);
  });

  try {
      await User.update(
          {
              user_id,
              password: hashedpw,
              name,
              contact_no,
              address
          },
          {
              where: {
                  user_id
              },
          }
      );
      res.status(200).json({
          message: "ok",
      });
  } catch (err) {
      if (!err.statusCode) {
          err.statusCode = 500;
      }
      next(err);
  }
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;