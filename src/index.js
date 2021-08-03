const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const blog = require('../models/database.js')
const admin = require('../models/admin.js')
const indexRoutes = require('../routes/indexRoutes')
const adminRoutes = require('../routes/adminRoutes')
const bodyParser = require('body-parser')

var urlEncodedParser = bodyParser.urlencoded()

const app = express()
app.listen(8080)

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', function (request, response) {
    response.render('main-page');
})

app.get('/main', function (request, response) {
    response.render('main');
})

app.get('/test', function (requres, response) {
    response.render('test')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(indexRoutes)
app.use(adminRoutes)

app.use(function (request, response) {
    response.status(404).render('404', { titl: 'Page Not Found' })
})

