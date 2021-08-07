const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 60 * 60 * 24 * 1000;
const createToken = function (id) {
    return jwt.sign({ id }, 'ahmet baba', { expiresIn: maxAge });
}

const admin_login_get = function (request, response) {
    response.render('../views/admin_login')
}

const admin_login_post = async function (request, response) {
    var name = request.body.adminName;
    var pas = request.body.adminPassword;
    Admin.findOne({ adminName: name }, async function (error, data) {
        if (!error) {
            if (data) {
                const adminID = data._id;
                const adminName = data.adminName;
                const adminPassword = data.adminPassword;
                const auth = await bcrypt.compare(pas, adminPassword)
                if (auth) {
                    const token = createToken(adminID)
                    response.cookie('jwt', token, {
                        maxAge: maxAge,
                        httpOnly: true,
                        secure: true
                    })
                    response.redirect('/adminPage')
                }
                else {
                    console.log('wrong pass')
                }
            }
            else {
                console.log('admin not found')
            }
        }
        else {
            console.log(error)
        }
    })
}

module.exports = {
    admin_login_get,
    admin_login_post
}