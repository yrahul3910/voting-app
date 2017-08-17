import React from "react";
import {Link} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
