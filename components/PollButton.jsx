import React from "react";
import PropTypes from "prop-types";

class PollButton extends React.Component {
    /*
    props:
        name (String): The name of the poll
    */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-default poll">{this.props.name}</button>
        );
    }
}

PollButton.propTypes = {
    name: PropTypes.string.isRequired
};

export default PollButton;
