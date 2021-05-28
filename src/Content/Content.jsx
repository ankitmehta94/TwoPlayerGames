import style from "./Content.css";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import XandO from "../Components/XandO/XandO";
import MarketPlace from "../Components/MarketPlace/MarketPlace";
import EditSummary from "../Components/EditSummary/EditSummary.jsx";
import { bindActionCreators } from "redux";
import { ANIMATION_DURATION } from "../Constants/configConstants";
import CreationLoader from "../Components/CreationLoader/CreationLoader";
import SummaryListActions from "../Components/SummaryList/SummaryListActions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


class Content extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path={"/tictactoe"}>
            <XandO />
          </Route>
        <Route path={"/connect4"}>
            <XandO />
          </Route>
          <Route path="/">
            <MarketPlace />
          </Route>
         
        </Switch>
      </Router>
    );
  }
}

export default Content;
