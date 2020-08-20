const express = require('express');
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');

// import routes module
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
const port = process.env.PORT || 9090;

// set hbs as view engine
app.set('view engine', 'hbs');

// define css, img, js, and views as static 
app.use(express.static('public'));
app.use(express.static('views'));

// partials
hbs.registerPartials(__dirname + '/views/partials');

// define css, img, js, and views as static 
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

// define the paths contained in routes module
app.use('/', routes);

app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
}));

db.connect();

app.listen(port, function(){
    console.log('App listening at port ' + port)
})


