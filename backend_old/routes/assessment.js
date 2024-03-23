const express = require('express')
const router = express.Router()

const {
  getAllAssessment,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  getAssessmentDetails,
} = require('../controllers/assessmentController')

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')

router
  .route('/company/:companyId')
  .get(isAuthenticatedUser, getAllAssessment)
  .post(isAuthenticatedUser, createAssessment)

router
  .route('/assessment/:assessmentId')
  .put(isAuthenticatedUser, updateAssessment)
  .delete(isAuthenticatedUser, deleteAssessment)
  .get(isAuthenticatedUser, getAssessmentDetails)

module.exports = router
