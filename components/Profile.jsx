import React from "react";
import PollButton from "./PollButton.jsx";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let p = this.props.polls.map((p, i) =>
            <Link key={i} to={"/poll/" + i}>
                <PollButton name={p.name} />
            </Link>
        );

        return (
            <div>
                <div className="col-md-4 col-md-offset-4">
                    <h2>{this.props.name}</h2>
                </div>
                <div className="col-md-4 col-md-offset-4">
                    <p>@{this.props.username}</p>
                </div>
                <div className="col-md-4 col-md-offset-4">
                    <h3>Your Polls</h3>
                    {p}
                </div>
                <div className="col-md-4 col-md-offset-4">
                    <button className="btn btn-primary">New Poll</button>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    polls: PropTypes.array.isRequired
};
export default Profile;
