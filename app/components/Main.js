var React = require("react");
var router = require("react-router-dom");
var Link = router.Link;
var Route = router.Route;

var Search = require("./children/Search");
var Saved = require("./children/Saved");

var apiKey = "2c24b581b73c4223ad99a961cfaad9db"

var Main = React.createClass({
  getInitialState: function() {
    return { search: "", startYear: "", endYear: "", searchResults: [], savedArticles: [] }
  },
  componentDidUpdate: function(prevProps, prevState) {
    // If state changed search for articles
    if (prevState.search !== this.state.search ||
        prevState.startYear !== this.state.startYear ||
        prevState.endYear !== this.state.endYear) {
      this.runSearch(this.state.search, this.state.startYear, this.state.endYear);
    }
  },
  
  runSearch: function(search, startYear, endYear) {
    // Search NYTimes API for articles
    var searchResults = [];
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': apiKey,
      'q': search,
      'begin_date': startYear,
      'end_date': endYear
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      if (result.response.docs.length > 0) {
        for (var i = 0; i < 5; i++) {
          searchResults.push(result.response.docs[i]);
        }
      }
      this.setState({ searchResults: searchResults });
    }.bind(this)).fail(function(err) {
      throw err;
    });
  },
  saveArticle: function(data) {
    // Save article to database
    var newArticle = {
      title: data.headline.main,
      date: data.pub_date,
      url: data.web_url,
      summary: data.snippet,
      author: data.byline.original
    }
    $.post("/api/saved", newArticle, function(res) {
      this.setSearchResults(newArticle);
    }.bind(this));
  },
  getArticle: function() {
    // Get all saved articles from database
    $.get("/api/saved", function(res) {
      this.setState({ savedArticles: res });
    }.bind(this));
  },
  deleteArticle: function(data) {
    // Delete article from database
    $.ajax({
      url: "/api/saved",
      type: "DELETE",
      data: data
    }).done(function() {
      this.getArticle();
    }.bind(this));
  },
  setVars: function(search, startYear, endYear) {
    // Set new states
    this.setState({ search: search, startYear: startYear, endYear: endYear });
  },
  setSearchResults: function(data) {
    // Remove saved articles from results display
    var newArr = [];
    this.state.searchResults.forEach(function(val) {
      if (val.web_url != data.url) {
        newArr.push(val);
      }
    });
    this.setState({ searchResults: newArr });
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron text-center">
              <h1><strong><i className="fa fa-newspaper-o" aria-hidden="true"></i>&nbsp;New York Times Search</strong></h1>
              <Link to="/"><button className="btn btn-info btn-lg link-button" type="button">
                <i className="fa fa-search" aria-hidden="true"></i> Search
              </button></Link>
              <Link to="/saved"><button className="btn btn-basic btn-lg link-button" type="button">
                <i className="fa fa-bookmark" aria-hidden="true"></i> Saved Articles
              </button></Link>
            </div>
          </div>
        </div>
        <div className="row">
          <Route exact path="/" render={(props) => (
            <Search {...props}
              setVars={this.setVars}
              searchResults={this.state.searchResults}
              saveArticle={this.saveArticle}
            />
          )} />
          <Route exact path="/saved" render={(props) => (
            <Saved {...props}
              savedArticles={this.state.savedArticles}
              getArticle={this.getArticle}
              deleteArticle={this.deleteArticle}
            />
          )} />
        </div>
      </div>
    );
  }
});

module.exports = Main;