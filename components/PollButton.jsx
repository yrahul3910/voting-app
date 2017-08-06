import React from "react";
import PropTypes from "prop-types";

class PollButton extends React.Component {
    /*
    props:
        name (String): The name of the poll
        url (String): The URL of the poll, which should lead to /polls/<url>
    */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={"/polls/" + this.props.url}>
                <button className="btn btn-default poll">{this.props.name}</button>
            </a>
        );
    }
}

PollButton.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default PollButton;
