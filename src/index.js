const express = require('express')
const indexRoutes = require('../routes/indexRoutes')
const adminRoutes = require('../routes/adminRoutes')
const panelRoutes = require('../routes/panelRoutes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()
app.listen(2000)
app.use(express.json())

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', function (request, response) {
    response.render('main-page');
})

app.use(fileUpload())

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/showBlogs', indexRoutes)
app.use('/adminLogin', adminRoutes)
app.use('/ahoPanel', panelRoutes)
app.use(function (request, response) {
    response.status(404).render('404', { titl: 'Page Not Found' })
})