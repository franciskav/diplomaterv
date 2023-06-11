const Company = require('../models/companies')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apiFilters')

exports.getAllUserCompany = catchAsyncErrors(async (req, res, next) => {
  req.query = {...req.query, userId: req.body.userId}
  console.log(req.query)
  const apiFilters = new APIFilters(Company.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const companies = await apiFilters.query

  const data = companies.map(company => ({
    id: company._id,
    companyName: company.companyName,
    lastAssessment: null,
  }))

  res.status(200).json({
    success: true,
    results: companies.length,
    data: data,
  })
})

exports.createUserCompany = catchAsyncErrors(async (req, res, next) => {
  const company = await Company.create(req.body)

  res.status(200).json({
    success: true,
    message: 'Company created',
    data: company,
  })
})

exports.updateUserCompany = catchAsyncErrors(async (req, res, next) => {
  let company = await Company.findById(req.params.id)

  if (!company) {
    return next(new ErrorHandler('Company not found', 404))
  }

  //TODO: check if the user is the company owner

  company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  const data = {
    id: company._id,
    companyName: company.companyName,
    zipCode: company.zipCode,
    city: company.city,
    street: company.street,
    door: company.door,
    contactName: company.contactName,
    email: company.email,
    phone: company.phone,
    lastAssessment: null,
  }

  res.status(200).json({
    success: true,
    data: data,
  })
})

exports.deleteUserCompany = catchAsyncErrors(async (req, res, next) => {
  let company = await Company.findById(req.params.id)

  if (!company) {
    return next(new ErrorHandler('Company not found', 404))
  }

  //TODO: check if the user is the company owner

  company = await Company.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Company is deleted',
  })
})

exports.getUserCompanyDetails = catchAsyncErrors(async (req, res, next) => {
  let company = await Company.findById(req.params.id)

  if (!company) {
    return next(new ErrorHandler('Company not found', 404))
  }

  const data = {
    id: company._id,
    name: company.companyName,
    address: {
      zipCode: company.zipCode,
      city: company.city,
      street: company.street,
      door: company.door,
    },
    contact: {
      name: company.contactName,
      email: company.email,
      phone: company.phone,
    },
    lastAssessment: null,
  }

  res.status(200).json({
    success: true,
    data: data,
  })
})
