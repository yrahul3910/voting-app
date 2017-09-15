import React from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

const $ = require("jquery");

class Poll extends React.Component {
    /*
        props:
            match: An object, with match.params.id giving the ID of the current poll.
            polls: An array of all polls.
            username: The username of the current user.
    */

    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
        this.deletePoll = this.deletePoll.bind(this);
    }

    deletePoll() {
        let pId = this.props.match.params.id;

        $.ajax({
            url: "http://localhost:8000/poll/" + this.props.polls[pId].url,
            type: "DELETE",
            success: () => {
                window.location = "/";
            }
        });
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

        let deleteButton = (current.username == this.props.username) ?
            <button className="btn btn-danger" onClick={this.deletePoll}>Delete this Poll</button> :
            <div></div>;

        return (
            <div className="row">
                <div className="col-md-3 col-md-offset-3">
                    <div className="row">
                        <h2>{current.q}</h2>
                    </div>
                    <div className="row">
                        {ops}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="row">
                        <canvas width="100%" height="100%"></canvas>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            {deleteButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Poll.propTypes = {
    match: PropTypes.object.isRequired,
    polls: PropTypes.array.isRequired,
    username: PropTypes.string
};

export default Poll;
