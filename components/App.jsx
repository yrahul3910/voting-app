import React from "react";

import Header from "./Header.jsx";
import Main from "./Main.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
        this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    }

    toggleLoggedIn() {
        this.setState({
            loggedIn: !this.state.loggedIn
        });
    }

    render() {
        return (
            <div>
                <Header loggedIn={this.state.loggedIn} />
                <Main toggleLogin={this.toggleLoggedIn} />
            </div>
        );
    }
}

export default App;
