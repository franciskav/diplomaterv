const express = require('express')
const router = express.Router()

//Import example controller methods
const {getSamples} = require('../controllers/sampleController')

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')

router
  .route('/sample')
  .get(isAuthenticatedUser, authorizeRoles('company_admin'), getSamples)

//router.route('/sample').get(getSamples)

module.exports = router
