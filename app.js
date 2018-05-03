const express = require('express');
const mongodb = require('mongodb')

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://ds113640.mlab.com:13640/tester');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database connected')
})

app.get('/', (req, res) => { 
    res.send('This is a game');
});



app.listen(process.env.PORT || 5000, () => console.log( "youre connected to http://localhost:5000" ));



