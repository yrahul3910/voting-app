import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class Header extends React.Component {
    /*
        props:
            loggedIn: Boolean representing whether user is logged in,
            user: User object containing name and polls
    */
    constructor(props) {
        super(props);
    }

    render() {
        let loginElement;
        if (this.props.loggedIn) {
            loginElement =
                <Link to="/profile">
                    {this.props.user.name}
                </Link>;
        } else {
            loginElement =
                <Link to="/login">
                    Login
                </Link>;
        }

        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">Voting App</a>
                </div>
                <div className="nav-items">
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="/">Home</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            {loginElement}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};

export default Header;
