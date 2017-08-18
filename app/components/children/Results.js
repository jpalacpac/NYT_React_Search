var React = require("react");

var Results = React.createClass({

  getInitialState: function() {
    return { displayResults: [] }
  },
  componentWillReceiveProps: function(nextProps) {
    // Check if search results is empty or not and display accordingly
    var displayResults = [];
    if (nextProps.searchResults) {
      if (nextProps.searchResults.length === 0) {
        displayResults.push(
          <div className="well" key="0">
            <h4 className="text-center">No results found.</h4>
          </div>
        );
      }
      else {
        displayResults = nextProps.searchResults.map(function(search, i) {
          return (
            <div className="well" key={i}>
              <a href={search.web_url}><h4 className="title">{search.headline.main}</h4></a>
              <button className="btn btn-success save-button" type="button" onClick={this.handleSave.bind(this, search)}>
                <i className="fa fa-bookmark" aria-hidden="true"></i> Save
              </button>
              <p className="author">{search.byline.original} &bull; {moment(search.pub_date).format("MMMM D, YYYY")}</p>
              <p className="summary">{search.snippet}</p>
            </div>
          );
        }, this);
      }
      this.setState({ displayResults: displayResults });
    }
  },
  handleSave: function(result) {
    // Save article
    this.props.saveArticle(result);
  },
  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title"><strong><i className="fa fa-table" aria-hidden="true"></i> Results</strong></h3>
        </div>
        <div className="panel-body">
          {this.state.displayResults}
        </div>
      </div>
    )
  }
});

module.exports = Results;