import React from "react";
import {Switch, Route} from "react-router-dom";

import Home from "./Home.jsx";
import Poll from "./Poll.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

class Main extends React.Component {
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
                    <Login />
                } />
                <Route path="/register" render={() =>
                    <Register />
                } />
            </Switch>
        );
    }
}

export default Main;
