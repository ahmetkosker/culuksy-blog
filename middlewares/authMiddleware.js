const jwt = require('jsonwebtoken')

const requireAuth = function (request, response, next) {
    var aho = request.cookies.jwt
    if (aho) {
        jwt.verify(aho, 'ahmet baba', function (err, decodedToken) {
            if (err) {
                console.log(err)
                response.redirect('/admin_login')
            }
            else {
                next()
            }
        })
    }
    else {
        response.redirect('/admin_login')
    }
}

module.exports = { requireAuth }
