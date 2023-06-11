const express = require('express')
const router = express.Router()

const {
  getAllUserCompany,
  createUserCompany,
  updateUserCompany,
  deleteUserCompany,
  getUserCompanyDetails,
} = require('../controllers/companyController')

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')

router.route('/user/companies').get(isAuthenticatedUser, getAllUserCompany)
router.route('/user/company').post(isAuthenticatedUser, createUserCompany)
router
  .route('/user/company/:id')
  .put(isAuthenticatedUser, updateUserCompany)
  .delete(isAuthenticatedUser, deleteUserCompany)
  .get(isAuthenticatedUser, getUserCompanyDetails)

module.exports = router
