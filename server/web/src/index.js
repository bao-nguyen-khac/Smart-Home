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

var connectSingleton = require('./config/db/index');

const hbs = handlebars.create({
    extname: '.hbs',
});

var db = connectSingleton.getInstance().connect()

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


// Routes init
route(app);
server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
