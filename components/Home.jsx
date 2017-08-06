import React from "react";
import PropTypes from "prop-types";

import Poll from "./Poll.jsx";

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
            <Poll key={i} name={p.name} url={p.url} />
        );
        return (
            <div>
                {p}
            </div>
        );
    }
}

Home.propTypes = {
    polls: PropTypes.array.isRequired
};

export default Home;
