const express = require('express');
const router = express.Router();
const forgotController = require('../controllers/forgotController');

router.put('/', forgotController.forgotPassword)
router.get('/', forgotController.showForgetPasswordPage)

module.exports = router