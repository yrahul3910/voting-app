import React from "react";

import Header from "./Header.jsx";
import Main from "./Main.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false, user: null };
        this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    }

    toggleLoggedIn(user) {
        this.setState({
            loggedIn: !this.state.loggedIn,
            user
        });
    }

    render() {
        return (
            <div>
                <Header loggedIn={this.state.loggedIn} user={this.state.user} />
                <Main toggleLogin={this.toggleLoggedIn} user={this.state.user} />
            </div>
        );
    }
}

export default App;
