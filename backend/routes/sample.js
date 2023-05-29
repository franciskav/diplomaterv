const express = require('express')
const router = express.Router()

//Import example controller methods
const {getSamples} = require('../controllers/sampleController')

router.route('/sample').get(getSamples)

module.exports = router
