var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

var databaseUri = "mongodb://heroku_h3lk8hzt:s14tr9skj75q4is6v8jein6nr@ds149613.mlab.com:49613/heroku_h3lk8hzt"
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  });
}
else {
  mongoose.connect(databaseUri, {
    useMongoClient: true
  });
}

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(require('./controllers/controller'));

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});