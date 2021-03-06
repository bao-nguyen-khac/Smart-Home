const Account = require('../models/Account');
const verifyToken = require('../../util/verifyToken');

module.exports = function AuthenMiddleware(req, res, next) {
    try {
        var token = req.signedCookies.token;
        var checkToken = verifyToken(token);
        if (checkToken) {
            Account.findOne({ _id: checkToken })
                .then(account => {
                    next();
                })
        } else {
            return res.redirect('/auth/user/login');
        }
    } catch (error) {
        return res.redirect('/auth/user/login');
    }
}