import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { promisify } from 'util';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import sendMail from '../utils/email.js';

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
    sameSite: 'None',
    secure: 'true',
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// @desc create new user
// @route POST api/v1/users/create-user
// @access Public
const createUser = catchAsync(async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.passwordConfirm
  ) {
    return next(new AppError('Please fill out form', 400));
  }
  if (req.body.password.length < 8 || req.body.passwordConfirm.length < 8) {
    return next(new AppError('Password must be at least 8 characters', 400));
  }
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, req, res);
});

// @desc login
// @route POST api/v1/users/login
// @access Public
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError('Email or password is incorrect', 401));
  }

  createSendToken(user, 200, req, res);
});

// @desc logout
// @route GET api/v1/users/logout
// @access Public
const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.status(200).json({ status: 'success' });
};

// @desc get user
// @route GET api/v1/users/
// @access Public
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// @desc update user
// @route PATCH api/v1/users/
// @access Public
const updateUser = catchAsync(async (req, res, next) => {
  if (!req.body.name && !req.body.email) {
    return next(new AppError('Must provide name or email to update', 400));
  }

  if (
    req.body.password ||
    req.body.passwordConfirm ||
    req.body.newPassword ||
    req.body.newPasswordConfirm
  ) {
    return next(
      new AppError('Passwords cannot be changed using this route', 400)
    );
  }

  let update;

  if (!req.body.name) {
    update = {
      email: req.body.email,
    };
  } else if (!req.body.email) {
    update = {
      name: req.body.name,
    };
  } else {
    update = req.body;
  }

  const user = await User.findByIdAndUpdate(req.user.id, update, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

// @desc delete user
// @route DELETE api/v1/users/
// @access Public
const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) return next(new AppError('User not found', 404));

  res.status(204);
});

// @desc verify user is logged in
// @route POST api/v1/users/check-login
// @access Public
const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // verify the token.
      const decodedPayload = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // check if the user still exists
      const currentUser = await User.findById(decodedPayload.id);

      if (!currentUser) {
        return next(new AppError('No user found', 404));
      }

      // make sure pw wasn't changed after token was issued.
      if (currentUser.changedPasswordAfter(decodedPayload.iat)) {
        return next(
          new AppError(
            'User recently changed password. Please log in again.',
            401
          )
        );
      }

      // if it makes it here, there is a logged in user
      res.status(200).json({
        status: 'success',
        message: 'user is logged in',
        currentUser,
      });
    } catch (err) {
      // console.log(err);
      return next(
        new AppError('Unable to verify user, please try to login again', 500)
      );
    }
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'user is not logged in',
    });
  }
};

// @desc update password
// @route PATCH api/v1/users/update-password
// @access Public
const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!(await user.isCorrectPassword(req.body.oldPassword, user.password))) {
    return next(new AppError('That password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;

  await user.save();

  createSendToken(user, 200, req, res);
});

// @desc send user a reset password token
// @route POST api/v1/users/forgot-password
// @access Public
const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('No user found with provided email', 404));
  }

  const resetPasswordToken = user.createPasswordResetToken();

  // saving hashed token to DB from createPasswordResetToken()
  await user.save({ validateBeforeSave: false });

  // send email with non hashed reset token
  // for development only - change back to req.get("host") for production
  const resetUrl = `${req.protocol}://localhost:${process.env.CLIENT_PORT}/auth/reset-password/${resetPasswordToken}`;
  const html = `<p>Please use this link to reset your password <a href=${resetUrl}>Reset Password</a> </p>`;

  await sendMail(user.email, html, 'Reset Password');

  res.status(200).json({
    status: 'success',
    message: 'token sent to email',
  });
});

// @desc reset password
// @route POST api/v1/users/reset-password/:token
// @access Public
const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  // set new password if token isn't expired & user exists
  if (!user) {
    return next(
      new AppError(
        'No user found. Please request to reset password again.',
        404
      )
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  await user.save();

  // update changedpasswordat prop in model middleware

  createSendToken(user, 200, req, res);
});

// middleware
const protect = catchAsync(async (req, res, next) => {
  let token;

  // if token is not in cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    // in production you should have jwt in cookie
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  // extract payload from jwt
  const jwtPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(jwtPayload.id);
  if (!user) {
    return next(new AppError('User not found', 401));
  }

  //check if user changed password after token was issued
  if (user.changedPasswordAfter(jwtPayload.iat)) {
    return next(
      new AppError('User recently changed password. Please log in again.', 401)
    );
  }

  // add user to req for other functions to use
  req.user = user;
  next();
});

// middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new AppError('You are not authorized', 401));
  }
};

// @desc get all users
// @route GET api/v1/users/admin-all-users
// @access ADMIN
const adminGetAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      data: users,
    },
  });
});

// @desc admin get user
// @route GET /admin-get-user/:id
// @access Admin
const adminGetUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// @desc admin update user password
// @route PATCH /admin-update-user-pw/:id
// @access Admin
const adminUpdateUserPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+password');

  if (!user) return next(new AppError('User not found', 404));

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// @desc admin update user info
// @route PATCH /admin-update-user-info/:id
// @access Admin
const adminUpdateUserInfo = catchAsync(async (req, res, next) => {
  // dont allow for passwords!!

  if (
    req.body.password ||
    req.body.passwordConfirm ||
    req.body.newPassword ||
    req.body.newPasswordConfirm
  ) {
    return next(
      new AppError('Passwords cannot be changed using this route', 400)
    );
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

// @desc delete user
// @route DELETE /admin-delete-user/:id
// @access admin
const adminDeleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('User not found', 404));

  res.status(204);
});

export {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  isLoggedIn,
  protect,
  updatePassword,
  getUser,
  updateUser,
  deleteUser,
  admin,
  adminGetAllUsers,
  adminGetUser,
  adminUpdateUserPassword,
  adminUpdateUserInfo,
  adminDeleteUser,
};
