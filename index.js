const express = require('express');
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

// import routes module
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const blogModel = require('./models/BlogModel.js');

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

app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
}));

// connects to the database
db.connect();

// post methods
app.post('/addBlog', function(req, res){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    var blog = new blogModel({
       blog_title: req.body.blog_title,
       blog_content: req.body.new_blog_content,
       blog_date: date,
    });
    
    blog.save(function(err, blog){
        var result;

        if (err) {
          console.log(err.errors);

          result = { success: false, message: "Blog was not created!" }
          res.send(result);
        } else {
          console.log("Successfully added new blog!");
          console.log(blog);

          result = { success: true, message: "Blog created!" }

          res.send(result);
        }

    });
});


app.listen(port, function(){
    console.log('App listening at port ' + port)
})
