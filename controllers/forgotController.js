const sendMail = require('../helpers/mailHelper');
const admin = require('../models/admin')
const crypto = require('crypto')


let forgotPassword = async function (request, response) {
    adminResetPasswordToken = crypto.randomBytes(15).toString('hex');
    let adminInfo = await admin.findOne({
        adminEmail: request.body.mail.trim()
    }, function (error, data) {
        if (error) {
            throw error;
        }
        if (data === null) {
            response.json({
                success: false
            });
        } else {
            let html = `<h2>Reset Your Password</h2><br>Reset Your <a href='http://localhost:2000/forgotPassword/recoveryPassword?resetPasswordToken=${adminResetPasswordToken}'>Password</a>`;
            let mailConfig = {
                from: process.env.USER_MAIL,
                to: request.body.mail,
                subject: 'Recovery your password',
                html: html
            }
            sendMail(mailConfig);
            response.json({
                success: true
            });
        }
    })
    let dateNow = new Date();
    let dateAnHour = dateNow.setHours(dateNow.getHours() + 1);
    adminInfo.resetPasswordToken = adminResetPasswordToken;
    adminInfo.resetPasswordExpires = new Date(dateAnHour);
    adminInfo.adminPassword = '123123123qq';
    adminInfo.save(function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log('admin saved');
        }
    });


}

let showForgetPasswordPage = function (request, response) {
    response.render('../views/forgotPassword');
}

let resetPasswordGet = function (request, response) {
    admin.find({
        resetPasswordToken: request.query.resetPasswordToken
    }, function (error, data) {
        if (error) {
            console.log(error);
        } else {

        }
    })
    response.render('resetPassword', {
        resetPasswordToken: request.query.resetPasswordToken
    });
}

let resetPasswordPut = function (request, response) {
    let password = request.body.password;
    let passwordAgain = request.body.passwordAgain;
    if (password === passwordAgain) {
        admin.findOne({
            resetPasswordToken: request.query.resetPasswordToken
        }, function (error, data) {
            if (!error) {
                if (data.resetPasswordExpires > new Date()) {
                    data.adminPassword = password;
                    data.save();
                }
            } else {
                console.log(error);
            }
        })
    }
}

module.exports = {
    forgotPassword,
    showForgetPasswordPage,
    resetPasswordGet,
    resetPasswordPut
}