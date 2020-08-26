const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

// import routes module
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
const port = process.env.PORT || 9090;

// support json encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// connects to the database
db.connect();

app.listen(port, function(){
    console.log('App listening at port ' + port)
});

hbs.registerHelper('equals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
