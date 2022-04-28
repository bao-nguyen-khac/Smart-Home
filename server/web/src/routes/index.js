const HomeController = require("../app/controllers/HomeController");
const AuthenMiddleware = require('../app/middlewares/AuthenMiddleware');
const authRoute = require('./auth');
function route(app) {
    app.use('/auth', authRoute);
    app.get('/light-manager', AuthenMiddleware, HomeController.lightManager);
    app.get('/door-manager', AuthenMiddleware, HomeController.doorManager);
    app.get('/key-adafruit', AuthenMiddleware, HomeController.getKeyAdafruit);
    app.get('/getTempLastHours', AuthenMiddleware, HomeController.getTempLastHours);
    app.get('/dashboard', AuthenMiddleware, HomeController.index);
    app.get('/', AuthenMiddleware, HomeController.rooms);
}

module.exports = route;
