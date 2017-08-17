import express from "express";
import path from "path";
import open from "open";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {MongoClient as mongo} from "mongodb";
import bcrypt from "bcrypt";

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get an instance of the router for API routes
let apiRoutes = express.Router();
app.use("/api", apiRoutes);

/* Order of these API routes matters, we don't want to protect
 /api/authenticate */
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
                            token
                        });
                    }
                });
            }
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

                    users.insertOne({
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

apiRoutes.get("/users", (req, res) => {
    mongo.connect(process.env.MONGO_URL, (err, db) => {
        let users = db.collection("users");
        users.find({}).toArray((e, users) => {
            res.json(users);
        });
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});

app.listen(port, (err) => {
    if (err) throw err;
    open("http://localhost:" + port);
});
