import React from "react";
import PropTypes from "prop-types";

class Poll extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // this.props.match is undefined for some reason, so work around it.
        const path = window.location.pathname;
        const id = path.charAt(path.length-1);

        let current = this.props.polls[id];

        let ops = current.ops.map((o, i) =>
            <button key={i} className="btn btn-default poll">{o.name}</button>
        );
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>{current.q}</h2>
                </div>
                <div className="col-md-4 col-md-offset-4">
                    {ops}
                </div>
            </div>
        );
    }
}

Poll.propTypes = {
    match: PropTypes.object, // always undefined!?
    polls: PropTypes.array.isRequired
};

export default Poll;
