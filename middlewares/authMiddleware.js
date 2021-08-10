const jwt = require('jsonwebtoken')

const requireAuth = function (request, response, next) {
    var admin = request.cookies.jwt
    if (admin) {
        jwt.verify(admin, 'exarons', function (err, decodedToken) {
            if (err) {
                console.log(err)
                response.redirect('/adminLogin')
            }
            else {
                next()
            }
        })
    }
    else {
        response.redirect('/adminLogin')
        next()
    }
}

module.exports = { requireAuth }
