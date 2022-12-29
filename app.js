const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes.js')
const userRouter = require('./routes/userRoutes.js')

const app = express()
//MIDDLEWARES
app.use(express.json())
app.use(morgan('dev'))

app.use((req,res,next)=>{
console.log('Hello from the middleware')
const requestTime = new Date().toISOString();
next();
})

//Routes
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports = app