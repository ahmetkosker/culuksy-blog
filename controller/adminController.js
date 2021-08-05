const dbConnect = require('../models/admin')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')

const admin_login_get = function (request, response) {
    response.render('../views/admin_login')
}

const admin_login_post = async function (request, response) {
    var name = request.body.adminName;
    var pas = request.body.adminPassword;
    Admin.findOne({ adminName: name }, async function (error, data) {
        if (!error) {
            if (data) {
                const adminName = data.adminName;
                const adminPassword = data.adminPassword;
                const auth = await bcrypt.compare(pas, adminPassword)
                if(auth){
                    response.redirect('/adminPage')
                }
                else{
                    console.log('wrong pass')
                }
            }
            else{
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