const blog = require('../models/database')

const admin_login_get = function (request, response) {
    response.render('../views/admin_login')
}

const admin_login_post = function (request, response) {
    console.log(request.body.fname)
}

module.exports = {
    admin_login_get,
    admin_login_post
}