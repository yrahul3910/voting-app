/* eslint-disable no-undef */
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import PollButton from "./PollButton.jsx";

class Home extends React.Component {
    /*
    props:
        polls: An array of poll objects
        toggleLogin: A function to toggle login status
    */

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (localStorage.getItem("token")) {
            $.getJSON("http://localhost:8000/api/whoami", {
                "token": localStorage.getItem("token")
            }, (user) => {
                this.props.toggleLogin(user);
            });
        }
    }

    render() {
        let p = this.props.polls.map((p, i) =>
            <Link key={i} to={"/poll/" + i}>
                <PollButton name={p.name} />
            </Link>
        );
        return (
            <div className="col-md-4 col-md-offset-4">
                {p}
            </div>
        );
    }
}

Home.propTypes = {
    polls: PropTypes.array.isRequired,
    toggleLogin: PropTypes.func.isRequired
};

export default Home;
