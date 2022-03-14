const https = require('https');
class HomeController {
    async index(req, res, next) {
        res.render('dashboard', {
            layout: 'home'
        })
    }
}

module.exports = new HomeController();
