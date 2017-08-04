import express from "express";
import path from "path";
import open from "open";
import compression from "compression";

const port = 8000;
const app = express();

app.use(compression()); // gzip files before sending
app.use(express.static("dist"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, (err) => {
    if (err) throw err;
    open("http://localhost:" + port);
});
