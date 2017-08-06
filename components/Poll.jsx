import React from "react";
import PropTypes from "prop-types";

class Poll extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let id = Number.parseInt(this.props.match.params.id);

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
    match: PropTypes.object.isRequired,
    polls: PropTypes.array.isRequired
};

export default Poll;
