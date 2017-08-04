// App entry point
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";

import {App} from "../components/App.jsx";

let p = [{
    url: "foo",
    name: "Test"
}];
ReactDOM.render(<App polls={p} />, document.getElementById("app"));
