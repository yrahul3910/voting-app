import React from "react";
import PropTypes from "prop-types";
const $ = require("jquery");

class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click(id) {
        $(`#${id}`).removeClass("btn-default");
        $(`#${id}`).addClass("btn-success");

        // Update the DB. For now, just update the mock array.
        // TODO: Later, update the DB instead of mock array.
        this.props.polls[this.props.match.params.id].ops[id].votes += 1;

        setTimeout(() => {
            // TODO: Show the chart here.
            console.log("Fire!");
        }, 1000);
    }

    render() {
        let id = Number.parseInt(this.props.match.params.id);

        let current = this.props.polls[id];

        let ops = current.ops.map((o, i) =>
            <button key={i} id={i} onClick={() => {this.click(i);}} className="btn btn-default poll">{o.name}</button>
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
