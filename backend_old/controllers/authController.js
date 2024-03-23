const User = require('../models/users')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const ErrorHandler = require('../utils/errorHandler')
const uuid = require('uuid')

// Register a new user   =>   /api/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const {company, firstName, lastName, email, password, role} = req.body

  const user = await User.create({
    company,
    firstName,
    lastName,
    email,
    password,
    role,
  })

  sendToken(user, 200, res)
})

// Login user  =>  /api/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const {email, password} = req.body

  // Checks if email or password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & Password'), 400)
  }

  // Finding user in database
  const user = await User.findOne({email}).select('+password')

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password.', 401))
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }

  sendToken(user, 200, res)
})

// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  })
})
