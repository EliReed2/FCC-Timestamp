// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:year-:mpnth-:day-:overflow", (req, res) => {
  res.json({ error: "Invalid Date" });
});
app.get("/api/:year-:month-:day", (req, res) => {
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);
  const day = parseInt(req.params.day);
  if (req.params.overflow || month > 12 || month < 1 || day > 31 || day < 1) {
    res.json({ error: "Invalid Date" });
  } else {
    const dateVal = new Date(year, month - 1, day);
    const unixTime = Math.floor(dateVal.getTime() / 1000);
    res.json({ unixTime: unixTime, dateTime: dateVal.toUTCString() });
  }
});

app.get("/api/:unix", (req, res) => {
  const unixTime = req.params.unix;
  const unixTimeSeconds = parseInt(unixTime);
  const dateTime = new Date(unixTimeSeconds);
  res.json({ unix: unixTime, date: dateTime.toUTCString() });
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
