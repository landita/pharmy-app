import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import de componentes
import NavbarComponent from '../components/navbar/navbar';
import LoginComponent from "../components/login/login";

const RouterLinks = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={NavbarComponent}>
                    
                </Route>
                <Route path="/login" component={LoginComponent} />
            </Switch>
        </Router>
    );
}
export default RouterLinks;