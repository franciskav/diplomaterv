//Get all example => /api/examples
exports.getSamples = (req, res, next) => {
  res.status(200).json({
    success: true,
    middlewareUser: req.user,
    message: 'This route will display all sample in the future',
  })
}
