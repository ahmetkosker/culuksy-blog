const express = require('express')
const indexRoutes = require('../routes/indexRoutes')
const adminRoutes = require('../routes/adminRoutes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { requireAuth } = require('../middlewares/authMiddleware')

const app = express()
app.listen(8080)
app.use(express.json())

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

app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/index', indexRoutes)
app.use('/admin_login', adminRoutes)
app.get('/adminPage', requireAuth, function(request, response) {
    response.render('adminPage')
})

app.use(function (request, response) {
    response.status(404).render('404', { titl: 'Page Not Found' })
})

