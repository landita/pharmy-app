import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import de componentes
import LoginComponent from "../components/login/login";

const RouterLinks = () => {
    return(
        <Router>
            <Switch>
                {/* imports del dashboard */}
            </Switch>
            <Switch>
                <Route path="/login" component={LoginComponent} />
            </Switch>
        </Router>
    );
}
export default RouterLinks;