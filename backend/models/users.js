const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please enter your company name'],
  },
  firstName: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter password for your account'],
    minlength: [8, 'Your password must be at least 8 characters long'],
    select: false,
  },
  role: {
    type: String,
    enum: {
      values: ['company_admin', 'company_user'],
      message: 'Please select correct role',
    },
    default: 'company_admin',
  },
})

// Encypting passwords before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// Return JSON Web Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  })
}

// Return JSON Refresh Token
userSchema.methods.getJwtRefreshToken = function () {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME,
  })
}

// Compare user password in database password
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
