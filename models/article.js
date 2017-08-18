var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  date: {
    type: Date
  },
  url: {
    type: String,
    default: "/"
  },
  summary: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;