// import modules express and handlebars
const express = require('express');
const hbs = require('hbs');

const path = require('path');
const app = express();
const port = process.env.PORT || 9090;

// define css, img, js, and views as static 
app.use(express.static('public'));
app.use(express.static('views'));

// partials
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('views'));

// define the paths contained in routes module
app.use('/contact-us', contact-us.html);

// set hbs as view engine
app.set('view engine', 'hbs');


app.listen(port, function(){
    console.log('App listening at port ' + port)
})


