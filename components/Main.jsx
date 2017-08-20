import React from "react";
import {Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";

import Home from "./Home.jsx";
import Poll from "./Poll.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Profile from "./Profile.jsx";
import NewPoll from "./NewPoll.jsx";

class Main extends React.Component {
    /*
    props:
        toggleLogin: function that should be called when user logs in/out,
        user: Object containing user name and polls
    */
    toggleLogin(user) {
        this.props.toggleLogin(user);
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
                <Route exact path="/login" render={() =>
                    <Login toggleLogin={this.props.toggleLogin} />
                } />
                <Route exact path="/register" render={() =>
                    <Register toggleLogin={this.props.toggleLogin} />
                } />
                <Route exact path="/profile" render={() =>
                    <Profile name={this.props.user.name}
                        username={this.props.user.username}
                        polls={this.props.user.polls} />
                } />
                <Route exact path="/polls/new" render={() =>
                    <NewPoll username={this.props.user.username} />
                } />
            </Switch>
        );
    }
}

Main.propTypes = {
    toggleLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default Main;
