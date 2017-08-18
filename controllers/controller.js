var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var path = require('path');

// Find all articles in database
router.get("/api/saved", function(req, res) {
  Article.find({}).exec(function(err, doc) {
    if (err) console.log(err);
    else res.send(doc);
  });
});

// Save new article to database
router.post("/api/saved", function(req, res) {
  var newArticle = req.body;
  newArticle = Article(newArticle);
  newArticle.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      console.log("Article saved");
      res.send(doc);
    }
  });
});

// Delete article from database
router.delete("/api/saved", function(req, res) {
  Article.findByIdAndRemove({ _id: req.body._id }, function(err, doc) {
    if (err) console.log(err);
    else res.send(doc);
  });
});

// Display index on any route not specified
router.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = router;