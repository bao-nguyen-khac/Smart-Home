const HomeController = require("../app/controllers/HomeController");

function route(app) {
    app.get('/light-manager', HomeController.lightManager);
    app.get('/door-manager', HomeController.doorManager);
    app.get('/key-adafruit', HomeController.getKeyAdafruit);
    app.get('/getTempLastHours', HomeController.getTempLastHours);
    app.get('/', HomeController.index);
}

module.exports = route;
