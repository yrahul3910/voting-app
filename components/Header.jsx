import React from "react";

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
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="/">Home</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
