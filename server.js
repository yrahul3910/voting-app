import express from "express";
import path from "path";
import open from "open";
import passport from "passport";
import session from "express-session";

require("./passport.js")(passport);

// Used for transpiling
import webpack from "webpack";
import config from "./webpack.config";
import compression from "compression";

const port = 8000;
const app = express();
const compiler = webpack(config);

// Use Webpack middleware
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(compression()); // gzip files before sending

// Required for Passport
app.use(session({secret: "Secret string"}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/auth", passport.authenticate("google", {scope: ["profile"], session: false}));

app.get("/auth/callback",
    passport.authenticate("google", {
        successRedirect: "/profile",
        failureRedirect: "/",
        session: false
    })
);

app.listen(port, (err) => {
    if (err) throw err;
    open("http://localhost:" + port);
});
