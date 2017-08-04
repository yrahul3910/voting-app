import express from "express";
import path from "path";
import open from "open";

// Used for transpiling
import webpack from "webpack";
import config from "../webpack.config";

const port = 8000;
const app = express();
const compiler = webpack(config);

// Use Webpack middleware
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, (err) => {
    if (err) throw err;
    open("http://localhost:" + port);
});
