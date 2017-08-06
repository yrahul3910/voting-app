import React from "react";
import PropTypes from "prop-types";

import PollButton from "./PollButton.jsx";

class Home extends React.Component {
    /*
    props:
        polls: An array of poll objects
    */

    constructor(props) {
        super(props);
    }

    render() {
        let p = this.props.polls.map((p, i) =>
            <PollButton key={i} name={p.name} url={p.url} />
        );
        return (
            <div className="col-md-4 col-md-offset-4">
                {p}
            </div>
        );
    }
}

Home.propTypes = {
    polls: PropTypes.array.isRequired
};

export default Home;
