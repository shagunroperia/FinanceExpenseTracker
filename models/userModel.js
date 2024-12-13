// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  userpassword: {
    type: String,
    required: true,
  },
  userpreferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    notifications: {
      type: Boolean,
      default: true,
    },
    monthlyLimit: {
      type: Number,
      default: 1000,
    },
    yearlyLimit: {
      type: Number,
      default: 12000,
    },
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('userpassword')) {
    this.userpassword = await bcrypt.hash(this.userpassword, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.userpassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
