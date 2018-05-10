const express = require('express');
const mongodb = require('mongodb');
const pug = require('pug')
const handlebar = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebar({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('.public/views/'));


const mongoose = require('mongoose');
mongoose.connect('mongodb://ds113640.mlab.com:13640/tester');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database connected')
})

app.get('/', (req, res) => { 
    res.render('home');
});



app.listen(process.env.PORT || 5000, () => console.log( "youre connected to http://localhost:5000" ));



