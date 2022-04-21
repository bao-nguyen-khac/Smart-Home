const SmartTemp = require('../models/SmartTemp')
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../../util/verifyToken');
class HomeController {
    async index(req, res, next) {
        res.render('dashboard', {
            layout: 'home'
        })
    }
    async lightManager(req, res, next) {
        res.render('light-manager', {
            layout: 'home'
        })
    }
    async doorManager(req, res, next) {
        res.render('door-manager', {
            layout: 'home'
        })
    }
    getKeyAdafruit(req, res, next) {
        res.send(process.env.KEY_ADAFRUIT)
    }
    async getTempLastHours(req, res, next){
        try {
            const dataTemp = await SmartTemp.find({}, {_id: 0, name: 0, key: 0})
            res.send(dataTemp)
        } catch (error) {
            res.send(error)
        }
    }
    login(req, res, next) {
        if (req.cookies.token) {
            if (verifyToken(req.cookies.token)) {
                return res.redirect('/');
            }
        }
        if (req.query.message) {
            var message = req.query.message;
        }
        res.render('login', {
            layout: 'authentication',
            message: message,
        });
    }
    async checkLogin(req, res, next) {
        try {
            const account = await Account.findOne({ username: req.body.username });
            if (account) {
                bcrypt.compare(req.body.password, account.password, function (err, result) {
                    if (result) {
                        var token = jwt.sign({ _id: account._id }, process.env.JWT_SECRECT);
                        res.cookie('token', token, {
                            signed: true,
                            expires: new Date(Date.now() + 8 * 3600000)
                        });
                        res.redirect('/');
                    } else {
                        res.redirect('/auth/user/login?message=Invalid%20username%20or%20password');
                    }
                });
            } else {
                res.redirect('/auth/user/login?message=Invalid%20username%20or%20password');
            }
        } catch (error) {
            next(error);
        }
    }
    logout(req, res, next) {
        res.clearCookie('token');
        res.redirect('/auth/user/login');
    }
}

module.exports = new HomeController();
