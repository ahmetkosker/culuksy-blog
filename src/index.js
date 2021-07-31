const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const blog = require('../database.js')

const app = express()
app.listen(8080)

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', function (request, response) {
    response.render('main-page');
})

app.get('/index', function (request, response) {
    response.render('index');
})

app.get('/main', function (request, response) {
    response.render('main');
})

app.use(function (request, response) {
    response.status(404).render('404', { titl: 'Page Not Found' })
})

