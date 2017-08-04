import React from "react";
import PropTypes from "prop-types";

import {Poll} from "./Poll.jsx";
import {Header} from "./Header.jsx";

class App extends React.Component {
    /*
    props:
        polls (Array): array of polls, fetched from MongoDB instance
    */
    constructor(props) {
        super(props);
    }

    render() {
        let polls = this.props.polls.map((i, p) =>
            <Poll key={i} url={p.url} name={p.topic} />
        );
        return (
            <div>
                <Header />
                {polls}
            </div>
        );
    }
}

App.propTypes = {
    polls: PropTypes.array.isRequired
};

module.exports = {App};
