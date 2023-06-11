const Assessment = require('../models/assessments')
const Company = require('../models/companies')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apiFilters')

exports.getAllAssessment = catchAsyncErrors(async (req, res, next) => {
  req.query = {...req.query, companyId: req.params.companyId}

  const apiFilters = new APIFilters(Assessment.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const assessments = await apiFilters.query

  const data = assessments.map(assessment => ({
    id: assessment._id,
    name: assessment.name,
    date: assessment.date,
    locationType: assessment.locationType,
  }))

  res.status(200).json({
    success: true,
    results: assessments.length,
    data: data,
  })
})

exports.createAssessment = catchAsyncErrors(async (req, res, next) => {
  const assessment = await Assessment.create({
    companyId: req.params.companyId,
    ...req.body,
  })

  //TODO: ez itt nem lesz jó, a companynál kell majd megnézni az assessmenteket és visszaadni a maxot
  let company = await Company.findById(req.params.companyId)

  if (new Date(company.lastAssessment) < new Date(assessment.date)) {
    company = await Company.findByIdAndUpdate(
      req.params.companyId,
      {lastAssessment: assessment.date},
      {
        new: true,
        runValidators: true,
      },
    )
  }

  const data = {
    id: assessment._id,
    name: assessment.name,
    date: assessment.date,
    locationType: assessment.locationType,
  }

  res.status(200).json({
    success: true,
    message: 'Assessment created',
    data: data,
  })
})

exports.updateAssessment = catchAsyncErrors(async (req, res, next) => {
  let assessment = await Assessment.findById(req.params.assessmentId)

  if (!assessment) {
    return next(new ErrorHandler('Assessment not found', 404))
  }

  assessment = await Assessment.findByIdAndUpdate(
    req.params.assessmentId,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  const data = {
    id: assessment._id,
    name: assessment.name,
    date: assessment.date,
    locationType: assessment.locationType,
  }

  res.status(200).json({
    success: true,
    data: data,
  })
})

exports.deleteAssessment = catchAsyncErrors(async (req, res, next) => {
  let assessment = await Assessment.findById(req.params.assessmentId)

  if (!assessment) {
    return next(new ErrorHandler('Assessment not found', 404))
  }

  assessment = await Assessment.findByIdAndDelete(req.params.assessmentId)

  res.status(200).json({
    success: true,
    message: 'Assessment is deleted',
  })
})

exports.getAssessmentDetails = catchAsyncErrors(async (req, res, next) => {
  let assessment = await Assessment.findById(req.params.assessmentId)

  if (!assessment) {
    return next(new ErrorHandler('Assessment not found', 404))
  }

  const data = {
    id: assessment._id,
    name: assessment.name,
    date: assessment.date,
    locationType: assessment.locationType,
  }

  res.status(200).json({
    success: true,
    data: data,
  })
})
