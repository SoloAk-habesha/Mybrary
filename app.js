if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 3000
const indexRouter = require('./routes/index')


app.set('view engine', 'ejs');
app.set('/views', __dirname + '/public')
app.set('layout', 'layouts/layout')


app.use(express.static('public'))
app.use(expressLayouts)
app.use('/', indexRouter)


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL).then(() => console.log('database connected'));


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})