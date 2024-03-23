//NOTE: try-catch helyett ebbe wrappeljük a controllereket
module.exports = func => (req, res, next) =>
    Promise.resolve(func(req, res, next))
           .catch(next);