const express = require('express')
const router = express.Router()
const blog = require('../models/database.js')
const indexController = require('../controller/indexController')

router.get('/index', indexController.index_show_blogs)

router.get('/index/:id', indexController.index_show_blog_page)

module.exports = router