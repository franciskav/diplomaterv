const express = require('express')
const router = express.Router()

const {
  getAllCompanyForUser,
  createCompanyForUser,
} = require('../controllers/companyController')

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')

router.route('/user/companies').get(isAuthenticatedUser, getAllCompanyForUser)
router
  .route('/user/create-company')
  .post(isAuthenticatedUser, createCompanyForUser)

module.exports = router
