const express = require('express')
const router = express.Router()
const panelController = require('../controller/panelController')
const { requireAuth } = require('../middlewares/authMiddleware')

router.get('/', requireAuth, panelController.adminPermission)
router.get('/create/blog', requireAuth, panelController.createBlog_get)
router.post('/create/blog', panelController.createBlog_post)
router.get('/delete/blog', panelController.deleteBlog_get)
router.get('/exit', panelController.exit)

module.exports = router