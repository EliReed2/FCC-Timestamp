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

app.get("/api/:date?", (req, res) => {
  req.time = new Date();
  const date_string = req.params.date;
  if (date_string) {
    if (isAllDigits(date_string) === false) {
      const dateTime = new Date(date_string);
      const infoArray = date_string.split("-");
      if (
        infoArray.length > 3 ||
        infoArray[1] > 12 ||
        infoArray[1] < 1 ||
        infoArray[2] > 31 ||
        infoArray[2] < 1
      ) {
        res.json({ error: "Invalid Date" });
      }
      const unixTime = Math.floor(dateTime.getTime());
      res.json({ unix: unixTime, utc: dateTime.toUTCString() });
    } else {
      const unixTime = parseInt(date_string);
      const dateTime = new Date(unixTime);
      res.json({ unix: unixTime, utc: dateTime.toUTCString() });
    }
  } else {
    const unixTime = Math.floor(req.time.getTime());
    res.json({ unix: unixTime, utc: req.time.toUTCString() });
  }
});

function isAllDigits(date_string) {
  return /^-?\d+$/.test(date_string);
}
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
