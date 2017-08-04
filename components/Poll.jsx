import React from "react";
import PropTypes from "prop-types";

class Poll extends React.Component {
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
            <a href={this.props.url}>
                <button className="btn">{this.props.name}</button>
            </a>
        );
    }
}

Poll.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

module.exports = {Poll};
