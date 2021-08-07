const express = require('express')
const router = express.Router()
const blog = require('../models/database.js')
const indexController = require('../controller/indexController')

router.get('/', indexController.index_show_blogs)

router.get('/:id', indexController.index_show_blog_page)

module.exports = router