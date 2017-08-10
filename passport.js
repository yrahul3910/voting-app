import dotenv from "dotenv";
import {OAuth2Strategy as GoogleStrategy} from "passport-google-oauth";
import {MongoClient as mongo} from "mongodb";

module.exports = (passport) => {
    dotenv.config();

    mongo.connect(process.env.MONGO_URL, (err, db) => {
        if (err) throw err;
        let users = db.collection("users");

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            users.findOne({
                "google_id": id
            }, (e, u) => {
                done(e, u);
            });
        });

        passport.use(new GoogleStrategy({
            clientID: process.env.AUTH_ID,
            clientSecret: process.env.AUTH_TOKEN,
            callbackURL: process.env.CALLBACK_URL
        },
        (token, refreshToken, profile, done) => {
            process.nextTick(() => {

                users.findOne({
                    "google_id": profile.id
                }, (e, user) => {
                    if (e) return done(e);

                    if (user)
                        return done(null, user);
                    else {
                        users.insertOne({
                            "google_id": profile.id,
                            name: profile.displayName,
                            polls: []
                        });
                    }
                });
            });
        }));
    });
};
