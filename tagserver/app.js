var GameData = require('./game.js');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const whitelist = ["http://localhost:3001", "http://localhost:3000/", "http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyparser.json()); //Handles JSON requests

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });
let g = new GameData();

app.get("/isstarted", (req, res) => {
    res.json(
        g.started
    );
});

app.get("/listplayers", (req, res) => {
    res.json(
        g.ListPlayers()
    );    
});

app.get("/gethistory", (req, res) => {
    res.json(
        g.GetHistory()
    );
});

app.post("/gettarget", (req, res) => {
    console.log(req.body);
    let y = req.body.playerid;
    console.log('getting target for ' + y);
    res.json(
        g.ListPlayers()
    );
});

app.post('/addplayer', (req, res) => {
    console.log(req.body);
    let y = req.body.playerid;
    console.log('adding ' + y);
    res.json(
        g.AddPlayer(y)
    );
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


