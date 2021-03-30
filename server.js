// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/*//A hack that doesnt work to check if the date is valid....
const isNotValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
}*/

/*Using https://www.epochconverter.com/ as a reference for the math and understanding epoch time.*/
app.get("/api/timestamp/:date",((req, res) => {
  let date = req.params.date; // initialize the variable

  /*if (isNotValidDate(date)) return res.json({error: "Invalid Date"});*/ // a hack that doesnt work...

  //We need to check what format the input is in. Convert to int and then set the variable to a date type. ELSE just use as is.
  if (Date.parse(date).toString() === "NaN") { // If the format is already in unix (Ie. 1451001600000)
    date = new Date(parseInt(date));
    /**Notes: the Date object returns an error if cast the variable correctly..*/

  } else if (Date.parse(date)) { // if the format is in YYYY-MM-DD
    date = new Date(date);
  }

  res.json({unix: date.getTime(), utc: date.toGMTString()})
  //For some reason to GMTString errors "Unresolved function or method toGMTString()" in Webstorm

  /**Trial and error below...*/

  /*if date.parse != "NaN" (ie 2000-10-14), then print out json
    else parseInt(date) -> date.parse console log*/


  // res.send(Date.parse("971481600000"));

  // var date = new Date(parseInt("2000-10-14")); //req.params.date    "2000-10-14"//returns unix   971481600000// returns nan
  //
  // res.send(String(date.getTime()));

  /*date = new Date(req.params.date*1000);
  if (req.params.date = date.getTime()/1000) {
    res.send("TRUE");
  } else {
    res.send("FALSE");
  };*/
  // if (!(date.getTime().toString() === "NaN")) { // IF UNIX Time
  //   res.json({unix: date.getTime(), utc: date.toGMTString()})
  // } else {
  //   date = new Date(req.params.date);
  //   res.json({unix: date.getTime(), utc: date.toGMTString()})
  // }
  /*res.json({unix: new Date(req.params.date).getTime(), utc: date.});*/
}));


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
