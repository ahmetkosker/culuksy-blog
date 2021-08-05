const express = require('express')
const router = express.Router()
const dbConnect = require('../models/admin')
const adminController = require('../controller/adminController')
const bodyParser = require('body-parser')

var urlEncodedParser = bodyParser.urlencoded()

router.get('/admin_login', urlEncodedParser, adminController.admin_login_get)
router.post('/admin_login', adminController.admin_login_post)

module.exports = router