if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 3000
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
var bodyParser = require('body-parser')


app.set('view engine', 'ejs');
app.set('/views', __dirname + '/public')
app.set('layout', 'layouts/layout')


app.use(express.json())
app.use(express.static('public'))
app.use(expressLayouts)


app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}))
app.use(bodyParser.json())

app.use('/', indexRouter)
app.use('/authors', authorRouter)
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL).then(() => console.log('database connected'));


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})