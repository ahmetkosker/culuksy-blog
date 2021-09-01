const express = require('express')
const router = express.Router()
const blog = require('../models/database.js')
const indexController = require('../controller/indexController')


router.get('/', indexController.showBlogs)

router.get('/:id', indexController.showBlogPage)

router.post('/:id/comments/:commentId', indexController.toke)

module.exports = router