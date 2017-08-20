/* eslint no-undef:0 */
import React from "react";
import PropTypes from "prop-types";

class NewPoll extends React.Component {
    /*
        props:
            username: Username of person who's posting the poll
    */
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        if(/[^a-zA-Z0-9-_]/.test($("#url").val())) {
            $("#message").html("<span style='color: red'>URL may not contain special characters</span>");
            return;
        }
        $.post("http://localhost:8000/api/polls/new", {
            title: $("#title").val(),
            options: $("textarea").val().split("\n").map((val) => {
                return {
                    name: val,
                    votes: 0
                };
            }),
            username: this.props.username,
            url: $("#url").val()
        }, (data) => {
            if (!data.success)
                $("#message").html(`<span style='color: red'>${data.message}</span>`);
            else
                $("#message").html("<span style='color: green'>Successfully created the poll!</span>");
        });
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <div id="message"></div>
                <div className="form-group">
                    <input type="text"
                        placeholder="Poll title"
                        className="form-control"
                        id="title" />
                </div>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        placeholder="Specify an id for your poll, like favorite-fruits"
                        id="url" />
                </div>
                Enter the poll options, one on each line.
                <div>
                    <textarea rows="10" cols="50"></textarea>
                </div>
                <button className="btn btn-success" onClick={this.click}>Create Poll</button>
            </div>
        );
    }
}

NewPoll.propTypes = {
    username: PropTypes.string.isRequired
};

export default NewPoll;
