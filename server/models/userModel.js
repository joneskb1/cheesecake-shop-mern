import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    select: false,
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Passwords must match'],
    validate: {
      validator: function (pwConfirm) {
        return this.password === pwConfirm;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // this runs on creation & if the password was modified
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  // runs ONLY if modifying existing pw
  // sub 1 sec so token is always created after password is changed
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.isCorrectPassword = async function (candidatePw, userPw) {
  return await bcrypt.compare(candidatePw, userPw);
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  //password was changed
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // if true then access should be denied as they've changed pw after token issue

    return jwtTimeStamp < changedTimeStamp;
  }

  //password not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // create token
  const resetPwToken = crypto.randomBytes(32).toString('hex');

  //encrypt token to DB
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetPwToken)
    .digest('hex');

  // set 10 min expiration
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetPwToken;
};

const user = mongoose.model('User', userSchema);

export default user;
