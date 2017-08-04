// App entry point
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <a class="navbar-brand" href="/">Voting App</a>
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

class Poll extends React.Component {
    /*
    props:
        name (String): The name of the poll
        url (String): The URL of the poll, which should lead to /polls/<url>
    */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={this.props.url}>
                <button onClick={this.click} className="btn">{this.props.name}</button>
            </a>
        );
    }
}

ReactDOM.render(<Header />, document.getElementById("app"));
