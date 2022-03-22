const HomeController = require("../app/controllers/HomeController");

function route(app) {
    app.get('/light-manager', HomeController.lightManager);
    app.get('/', HomeController.index);
}

module.exports = route;
