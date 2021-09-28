const sendMail = require('../helpers/mailHelper');
const admin = require('../models/admin')

let forgotPassword = function (request, response) {
    let mailConfig = {
        from: process.env.USER_MAIL,
        to: request.body.mail,
        subject: 'test',
        text: 'test'
    }
    admin.findOne({ adminEmail: request.body.mail.trim() }, function (error, data) {
        if (error) {
            throw error;
        }
        if (data === null) {
            response.json({ success: false });
        }
        else {
            sendMail(mailConfig);
            response.json({ success: true });
        }
    })
}

let showForgetPasswordPage = function (request, response) {
    response.render('../views/forgotPassword')
}

module.exports = {
    forgotPassword,
    showForgetPasswordPage
}