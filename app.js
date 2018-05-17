const express = require('express');
const mongodb = require('mongodb');
var bodyParser = require('body-parser');
const pug = require('pug')
const handlebar = require('express-handlebars');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const mongoose = require('mongoose');

const app = express();

app.engine('handlebars', handlebar({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}))

app.use(express.static('.public/views/'));


mongoose.connect('mongodb://cjbruin:9323Kenzie@ds113640.mlab.com:13640/tester');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database connected')
})

// Schema for adding new users to the database
const newUserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    faction: String,
    rank: Number
});

const newUser = mongoose.model('newUser', newUserSchema);

app.get('/', (req, res) => { 
    res.render('home', { title: 'Form Validation', success: req.session.success, errors: req.session.errors});
});

app.post('/createuser', (req, res) => {
    req.check('password', 'Password is invalid').equals(req.body.passwordConfirmed);
    req.check('username', 'Username cannot be empty').notEmpty();
    
    let errors = req.validationErrors();
    
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/');
    } else {
        req.session.success = true;
        let user = new newUser({
            userName: req.body.username,
            password: req.body.password,
            rank: 1,
        })

        user.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/factions');
            }
          });
    } 
})

app.get('/factions', (req, res) => {
    res.send('Select Factions');
})

app.listen(process.env.PORT || 5000, () => console.log( "youre connected to http://localhost:5000" ));