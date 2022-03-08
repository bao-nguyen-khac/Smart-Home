
class HomeController {
    index(req, res, next){
        res.render('dashboard', {
            layout: 'home',
        })
    }
}

module.exports = new HomeController();
