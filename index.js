const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const path = require('path');
const methodOverride = require('method-override')
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const route = require('./server/routes/index');
const connectDB = require('./server/database/connection')

// variables environment config
dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 3000; 

// HTTP logger
app.use(morgan('tiny'))

// connectDB mongoDB
connectDB()

// parser request 
app.use(bodyParser.urlencoded({ extended: true }))

// set view engine
app.set('view engine', 'ejs')   
app.set('views', path.join(__dirname, 'views'))

// set view layouts ejs
// app.use(expressLayouts)
// app.set('layouts', path.join(__dirname, '/views/include/layout.ejs'))

// set up static files
app.use(express.static(path.join(__dirname, 'assets')))
// need a static css file

// method-override HTTP 
app.use(methodOverride('_method'))

// routes init
app.use('/', route)

// app listener
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
