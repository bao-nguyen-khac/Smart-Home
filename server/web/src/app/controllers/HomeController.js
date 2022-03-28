
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
}

module.exports = new HomeController();
