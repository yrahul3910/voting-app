import React from "react";
import {Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";

import Home from "./Home.jsx";
import Poll from "./Poll.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

class Main extends React.Component {
    /*
    props:
        toggleLogin: function that should be called when user logs in/out
    */
    toggleLogin() {
        this.props.toggleLogin();
    }

    render() {
        const p = [
            {
                name: "Test poll",
                q: "What is your favorite food?",
                ops: [
                    {
                        name: "Pizza",
                        votes: 1,
                    },
                    {
                        name: "Pasta",
                        votes: 2,
                    },
                    {
                        name: "Burger",
                        votes: 1
                    },
                    {
                        name: "Tacos",
                        votes: 3,
                    },
                    {
                        name: "Burrito",
                        votes: 2
                    }
                ],
                uid: "1"
            }
        ];
        return (
            <Switch>
                <Route exact path="/" render={ () =>
                    <Home polls={p} />
                } />
                <Route path="/poll/:id" render={(props) =>
                    <Poll polls={p} {...props} />
                } />
                <Route path="/login" render={() =>
                    <Login toggleLogin={this.props.toggleLogin} />
                } />
                <Route path="/register" render={() =>
                    <Register toggleLogin={this.props.toggleLogin} />
                } />
            </Switch>
        );
    }
}

Main.propTypes = {
    toggleLogin: PropTypes.func.isRequired
};

export default Main;
