import React from "react";
import {Switch, Route} from "react-router-dom";

import Home from "./Home.jsx";
class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={ () =>
                    <Home polls={[{name: "Test poll", url: "test"}]} />
                } />
            </Switch>
        );
    }
}

export default Main;
