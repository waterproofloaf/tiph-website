const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

// import routes module
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 9090;
}

// support json encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set hbs as view engine
app.set('view engine', 'hbs');

// define css, img, js, and views as static 
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('uploads'));

// partials
hbs.registerPartials(__dirname + '/views/partials');

// define css, img, js, and views as static 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// define the paths contained in routes module
app.use('/', routes);

// connects to the database
db.connect();

app.listen(port, function () {
  console.log('App listening at port ' + port)
});

// Helpers

// var helpers = require('handlebars-helpers')({
//   hbs: hbs
// });

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper('repeat', require('handlebars-helper-repeat'));

hbs.registerHelper("add", function (a, b) {
  return parseInt(a) + b;
});

hbs.registerHelper("minus", function (a, b) {
  return parseInt(a) - b;
});

hbs.registerHelper('equals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('each_upto', function (ary, max, options) {
  if (!ary || ary.length == 0)
    return options.inverse(this);

  var result = [];
  for (var i = 0; i < max && i < ary.length; ++i)
    result.push(options.fn(ary[i]));
  return result.join('');
});
