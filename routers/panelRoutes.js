const express = require('express')
const router = express.Router()
const panelController = require('../controllers/panelController')
const { requireAuth } = require('../middlewares/authMiddleware')
const bodyParser = require('body-parser')

var urlEncodedParser = bodyParser.urlencoded()

router.use(requireAuth)

router.get('/', panelController.adminPermission)
router.get('/create/blog',  panelController.createBlog_get)
router.post('/create/blog', panelController.createBlog_post)
router.get('/delete/blog', panelController.deleteBlog_get)
router.delete('/delete/blog', urlEncodedParser, panelController.deleteBlog_delete)
router.get('/delete/:id', panelController.deleteBlogPage_get)
router.get('/exit', panelController.exit)

module.exports = router