var React = require("react");
var router = require("react-router-dom");
var BrowserRouter = router.BrowserRouter;
var Route = router.Route;

var Main = require("../components/Main");

module.exports = (
  <BrowserRouter>
    <Route component={Main} />
  </BrowserRouter>
);