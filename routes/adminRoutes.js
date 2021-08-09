const express = require('express')
const router = express.Router()
const dbConnect = require('../models/admin')
const adminController = require('../controller/adminController')
const bodyParser = require('body-parser')

var urlEncodedParser = bodyParser.urlencoded()

router.get('/', urlEncodedParser, adminController.adminLogin_get)
router.post('/', adminController.adminLogin_post)
router.get('/ahoPanel/create/blog', adminController.createBlog)

module.exports = router