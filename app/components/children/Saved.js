var React = require("react");

var Saved = React.createClass({

  getInitialState: function() {
    return { displayResults: [] }
  },
  componentDidMount: function() {
    // Display saved articles
    this.props.getArticle();
  },
  componentWillReceiveProps: function(nextProps) {
    // Check if saved articles exist and display accordingly
    var displayResults = [];
    if (nextProps.savedArticles.length === 0) {
      displayResults.push(
        <div className="well" key="0">
          <h4 className="text-center">No saved articles.</h4>
        </div>
      );
    }
    else {
      displayResults = nextProps.savedArticles.map(function(res, i) {
        return (
          <div className="well" key={i} id={res._id}>
            <a href={res.url}><h4 className="title">{res.title}</h4></a>
            <button className="btn btn-default save-button" type="button" onClick={this.handleClick.bind(this, res)}>
              <i className="fa fa-trash-o" aria-hidden="true"></i> Remove
            </button>
            <p className="author">{res.author} &bull; {moment(res.date).format("MMMM D, YYYY")}</p>
            <p className="summary">{res.summary}</p>
          </div>
        );
      }, this)
    }
    this.setState({ displayResults: displayResults });
  },
  handleClick: function(result) {
    // Remove article from saved
    this.props.deleteArticle(result);
  },
  render: function() {
    return (
      <div className="col-md-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title"><strong><i className="fa fa-bookmark" aria-hidden="true"></i> Saved Articles</strong></h3>
          </div>
          <div className="panel-body">
            {this.state.displayResults}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Saved;