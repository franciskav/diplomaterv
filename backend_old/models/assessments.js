const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema({
  companyId: {
    type: String,
    require: [true, 'Please enter your company'],
  },
  name: {
    type: String,
    require: [true, 'Please enter name'],
  },
  date: {
    type: String,
    require: [true, 'Please enter date'],
  },
  locationType: {
    type: String,
    require: [true, 'Please enter locationType'],
  },
})

module.exports = mongoose.model('Assessment', assessmentSchema)
