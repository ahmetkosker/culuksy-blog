const nodemailer = require('nodemailer')

async function sendMail(mailConfig) {
    let transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASS
        }
    });

    await transporter.sendMail(mailConfig, function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Sent');
        }
    });
};


module.exports = sendMail
