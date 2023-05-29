const mongoose = require('mongoose')

const sampleSchema = new mongoose.Schema({})

module.exports = mongoose.model('Sample', sampleSchema)
