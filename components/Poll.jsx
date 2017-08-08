import React from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

const $ = require("jquery");

class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
    }

    // from https://stackoverflow.com/a/25709983
    getRandomColor() {
        let letters = "0123456789ABCDEF".split("");
        let color = "#";

        for (let i = 0; i < 6; i++ )
            color += letters[Math.floor(Math.random() * 16)];
        return color;
    }

    click(id) {
        $(`#${id}`).removeClass("btn-default");
        $(`#${id}`).addClass("btn-success");

        // Update the DB. For now, just update the mock array.
        // TODO: Later, update the DB instead of mock array.
        let pId = this.props.match.params.id;
        this.props.polls[pId].ops[id].votes += 1;

        setTimeout(() => {
            let ctx = $("canvas");
            new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: this.props.polls[pId].ops.map(e => e.name),
                    datasets: [{
                        label: "# Votes",
                        data: this.props.polls[pId].ops.map(e => e.votes),
                        backgroundColor: this.props.polls[pId].ops.map(this.getRandomColor),
                        borderWidth: 1
                    }]
                }
            });

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
                <div className="col-md-4 col-md-offset-4">
                    <canvas width="100%" height="100%"></canvas>
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
