/* eslint no-undef:0 */

import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class Login extends React.Component {
    /*
        props:
            toggleLogin: function to call when login status changes
    */
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        $.post("http://localhost:8000/api/authenticate", {
            username: $("#username").val(),
            password: $("#password").val()
        }, (data) => {
            if (!data.success)
                $("#message").html("<span style='color: red'>Authentication failed</span>");
            else {
                $("#message").html("<span style='color: green'>Success</span>");

                localStorage.setItem("token", data.token);
                this.props.toggleLogin(data.user);
            }
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div id="message"></div>
                    <div className="input-group">
                        <input type="text" id="username" placeholder="Username" />
                    </div>
                    <div className="input-group">
                        <input type="password" id="password" placeholder="Password" />
                    </div>
                    <button onClick={this.click}>Submit</button>
                    <div>
                        <span>Don't have an account?</span>
                        <Link to="/register"> Sign up now!</Link>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    toggleLogin: PropTypes.func.isRequired
};

export default Login;
