const Company = require('../models/companies')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apiFilters')

exports.getAllCompanyForUser = catchAsyncErrors(async (req, res, next) => {
  const apiFilters = new APIFilters(Company.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const companies = await apiFilters.query

  const data = companies.map(company => ({
    id: company._id,
    name: company.companyName,
    lastAssessment: null,
  }))

  res.status(200).json({
    success: true,
    results: companies.length,
    data: data,
  })
})

exports.createCompanyForUser = catchAsyncErrors(async (req, res, next) => {
  const company = await Company.create(req.body)

  res.status(200).json({
    success: true,
    message: 'Company created',
    data: company,
  })
})
