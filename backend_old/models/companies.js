const mongoose = require('mongoose')
const validator = require('validator')

const companySchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, 'Please enter user'],
  },
  companyName: {
    type: String,
    require: [true, 'Please enter your companyName'],
  },
  zipCode: {
    type: String,
    require: [true, 'Please enter your zipCode'],
  },
  city: {
    type: String,
    require: [true, 'Please enter your city'],
  },
  street: {
    type: String,
    require: [true, 'Please enter your street'],
  },
  door: {
    type: String,
  },
  contactName: {
    type: String,
    require: [true, 'Please enter your contactName'],
  },
  email: {
    type: String,
    require: [true, 'Please enter your email'],
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  phone: {
    type: String,
    require: [true, 'Please enter your phone'],
  },
  lastAssessment: {
    type: String,
  },
})

module.exports = mongoose.model('Company', companySchema)
