import express from "express";
import open from "open";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {MongoClient as mongo} from "mongodb";
import bcrypt from "bcrypt";
import session from "express-session";

// Used for transpiling
import webpack from "webpack";
import config from "./webpack.config";
import compression from "compression";

const port = 8000;
const app = express();
const compiler = webpack(config);

dotenv.config();
// Use Webpack middleware
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(cors());
app.use(compression()); // gzip files before sending

app.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get an instance of the router for API routes
let apiRoutes = express.Router();
app.use("/api", apiRoutes);

/* Order of these API routes matters, we don't want to protect
 /api/authenticate */
// This is for login.
apiRoutes.post("/authenticate", (req, res) => {
    mongo.connect(process.env.MONGO_URL, (err, db) => {
        let users = db.collection("users");

        users.findOne({
            username: req.body.username
        }, (e, user) => {
            if (e) throw e;

            if (!user)
                res.json({success: false, message: "User does not exist!"});
            else {
                bcrypt.compare(req.body.password, user.pwd, (e_, r) => {
                    if (e_) throw e_;

                    if (!r)
                        res.json({success: false, message: "Incorrect password"});
                    else {
                        let token = jwt.sign(user, process.env.SECRET, {
                            expiresIn: "1 day"
                        });

                        res.json({
                            success: true,
                            message: "Authenticated successfully.",
                            user: {
                                name: user.name,
                                username: user.username,
                                polls: user.polls
                            },
                            token
                        });
                    }
                });
            }
            db.close();
        });
    });
});

apiRoutes.post("/register", (req, res) => {
    mongo.connect(process.env.MONGO_URL, (err, db) => {
        if (err) throw err;

        let users = db.collection("users");
        users.findOne({
            username: req.body.username
        }, (e, docs) => {
            if (e) throw e;

            if (docs)
                res.json({ success: false, message: "Username already exists!" });
            else {
                bcrypt.hash(req.body.password, 10, (e_, hash) => {
                    if (e_) throw e_;

                    users.insert({
                        username: req.body.username,
                        name: req.body.name,
                        pwd: hash,
                        polls: []
                    });
                });
                res.json({ success: true, message: "Success!" });
            }
        });
    });
});

apiRoutes.post("/polls/new", (req, res) => {
    mongo.connect(process.env.MONGO_URL, (err, db) => {
        if (err) {
            res.json({
                success: false,
                message: "Failed to insert into database."
            });
            db.close();
            return;
        }

        // First add poll to the polls collection
        let coll = db.collection("polls");

        // Make sure the URL doesn't already exist
        coll.findOne({
            url: req.body.url
        }, (e, results) => {
            if (results) {
                res.json({
                    success: false,
                    message: "URL cannot be duplicate."
                });
                return;
            }

            coll.insertOne({
                title: req.body.title,
                ops: req.body.options,
                username: req.body.username,
                url: req.body.url
            });

            // Now update the user's record
            coll = db.collection("users");
            coll.findOneAndUpdate({
                username: req.body.username
            }, {
                $push: {
                    polls: req.body.url
                }
            });
            db.close();

            res.json({
                success: true,
                message: "Successfully inserted."
            });
        });
    });
});

apiRoutes.use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err)
                res.json({success: false, message: "Failed to authenticate token"});
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
});

apiRoutes.get("/whoami", (req, res) => {
    let user = req.decoded;
    res.send(user);
});

apiRoutes.get("/users", (req, res) => {
    mongo.connect(process.env.MONGO_URL, (err, db) => {
        let users = db.collection("users");
        users.find({}).toArray((e, users) => {
            res.json(users);
        });
        db.close();
    });
});

app.get("/", (req, res) => {
    res.sendFile("./src/index.html");
});

app.listen(port, (err) => {
    if (err) throw err;
    open("http://localhost:" + port);
});
