const express = require('express')
const app = express()

const dotenv = require('dotenv')

//Import connect database
const connectDatabase = require('./config/database')

//Setting up config.env
dotenv.config({path: './config/config.env'})

//Connect to database
connectDatabase()

//Import middleware
const sampleMiddleware = require('./middlewares/sampleMiddleware')

app.use(sampleMiddleware)

//Import ruotes
const sample = require('./routes/sample')

app.use('/api', sample)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`)
})
