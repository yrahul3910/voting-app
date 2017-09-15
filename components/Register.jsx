/* eslint no-undef:0 */
import React from "react";
import PropTypes from "prop-types";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        let name = $("#name").val();
        let username = $("#username").val();
        $.post("http://localhost:8000/api/register", {
            username,
            password: $("#password").val(),
            name
        }, (data) => {
            if (!data.success)
                $("#message").html("<span style='color: red'>Username already exists!</span>");
            else {
                $("#message").html("<span style='color: green'>Success!</span>");
                this.props.toggleLogin({
                    name,
                    username,
                    polls: []
                });

                localStorage.setItem("token", data.token);
            }
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div id="message"></div>
                    <div className="input-group">
                        <input type="text" id="name" placeholder="Name" />
                    </div><p></p>
                    <div className="input-group">
                        <input type="text" id="username" placeholder="Username" />
                    </div><p></p>
                    <div className="input-group">
                        <input type="password" id="password" placeholder="Password" />
                    </div><p></p>
                    <button onClick={this.click}>Create</button>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    toggleLogin: PropTypes.func.isRequired
};

export default Register;
