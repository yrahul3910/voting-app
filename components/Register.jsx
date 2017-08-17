/* eslint no-undef:0 */
import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        $.post("/api/register", {
            username: $("#username").val(),
            password: $("#password").val(),
            name: $("#name").val()
        }, (data) => {
            if (!data.success)
                $("#message").html("<span style='color: red'>Username already exists!</span>");
            else
                $("#message").html("<span style='color: green'>Success!</span>");
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

export default Register;
