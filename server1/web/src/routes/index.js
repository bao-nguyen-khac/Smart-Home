const HomeController = require("../app/controllers/HomeController");

function route(app) {
    app.use('/', HomeController.index);
}

module.exports = route;
