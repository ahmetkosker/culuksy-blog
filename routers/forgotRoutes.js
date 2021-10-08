const express = require('express');
const router = express.Router();
const forgotController = require('../controllers/forgotController');

router.put('/', forgotController.forgotPassword);
router.get('/', forgotController.showForgetPasswordPage);
router.get('/recoveryPassword', forgotController.resetPasswordGet);
router.post('/recoveryPassword', forgotController.resetPasswordPut),

module.exports = router