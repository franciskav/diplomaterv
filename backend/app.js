const express = require('express')
const app = express()

const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const connectDatabase = require('./config/database')
const errorMiddleware = require('./middlewares/errors')
const ErrorHandler = require('./utils/errorHandler')

//Setting up config.env
dotenv.config({path: './config/config.env'})

// Handling Uncaught Exception
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`)
  console.log('Shutting down due to uncaught exception.')
  process.exit(1)
})

//Connect to database
connectDatabase()

// Setup body parser
app.use(express.json())

// Set cookie parser
app.use(cookieParser())

// Importing all routes
const sample = require('./routes/sample')
const auth = require('./routes/auth')
const company = require('./routes/company')

app.use('/api', sample)
app.use('/api/auth', auth)
app.use('/api/company', company)

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404))
})

// Middleware to handle errors
app.use(errorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`)
})

// Handling Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server due to Unhandled promise rejection.')
  server.close(() => {
    process.exit(1)
  })
})
