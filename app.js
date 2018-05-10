const express = require('express');
const mongodb = require('mongodb');
var bodyParser = require('body-parser');
const pug = require('pug')
const handlebar = require('express-handlebars');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const app = express();

app.engine('handlebars', handlebar({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}))

app.use(express.static('.public/views/'));


const mongoose = require('mongoose');
mongoose.connect('mongodb://ds113640.mlab.com:13640/tester');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database connected')
})

app.get('/', (req, res) => { 
    res.render('home', { title: 'Form Validation', success: req.session.success, errors: req.session.errors});
});

app.post('/createuser', (req, res) => {
    req.check('password', 'password is invalid').equals(req.body.passwordConfirmed);
    
    let errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
    }
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.send('yolo');
})


app.listen(process.env.PORT || 5000, () => console.log( "youre connected to http://localhost:5000" ));



