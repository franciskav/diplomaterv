const sampleMiddleware = (req, res, next) => {
  console.log('Hello sample middleware')
  req.user = 'Franciska Vigh'
  next()
}

module.exports = sampleMiddleware
