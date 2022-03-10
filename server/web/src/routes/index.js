const HomeController = require("../app/controllers/HomeController");

function route(app) {
    app.get('/', HomeController.index);
}

module.exports = route;
