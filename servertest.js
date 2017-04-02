/*Intitialize express and mongoose*/

var multer = require("multer");

var streamifier = require('streamifier');

var express = require('express');

var app = express();

var engines = require('consolidate');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoose = require('mongoose');

/*This is to set the http headers*/
var cors = require('cors');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

var nodemailer = require('nodemailer');

/*Decalring from which folder/source will get the request*/
app.use(express.static(__dirname + '/app'));

app.use(cors());

/*This is to identify what type od data is coming from http request*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next('Please choose a fruit!');
    } else {
        res.send("Your favorite fruit is " + favorite);
    }
});

app.get('/getUser/:userName', function(req, res) {
    var name = req.params.userName;
    console.log(name);
    res.send('Return ' + name);
});




MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res) {

        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', { 'movies': docs });
        });

    });

    app.use(function(req, res) {
        res.sendStatus(404);
    });

    var server = app.listen(9000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});



/*this is to connect with mongolab
mongoose.connect('mongodb://mamta:mamta@ds161505.mlab.com:61505/taskmanagement', function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Mongodb connected successfully');
    }
});

*/

/*
 * @mamta1992 {string} db user
 * @m@mta1992@ds015879 {string} db password
 * @taskmanagement {string} db name
 * (will get those details after login into mongo lab and creating db)
 */
/*var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs;

app.listen(9000);
console.log('Server file executed successfully1');
*/