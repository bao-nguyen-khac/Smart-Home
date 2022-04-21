require('dotenv').config()
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes');
const handlebars = require('express-handlebars');
const http = require("http");
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server)
var connectSingleton = require('./config/db/index');
const SmartLed = require('./app/models/SmartLed');
const Notify = require('./app/models/Notify');

const hbs = handlebars.create({
    extname: '.hbs',
});

connectSingleton.getInstance().connect()

// Middlleware built-in
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
); // unicode
app.use(express.json()); // axios, ajax
// Middleware custome

// Set up
app.use(morgan('combined'));

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

io.on("connection", () => {
    console.log('User connected');
    SmartLed.watch().on('change', data => {
        io.emit("lightChange", data.fullDocument);
    })
    Notify.watch().on('change', data => {
        io.emit("notifyChange", data.fullDocument);
    })
});

// Routes init
route(app);
server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
