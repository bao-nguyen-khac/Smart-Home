const SmartTemp = require('../models/SmartTemp')
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
}

module.exports = new HomeController();
