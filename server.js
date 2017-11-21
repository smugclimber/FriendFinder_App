// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./app/data/friends.js");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var matchName = "Nobody yet!";

function comparison(newScore)
{
  var finalVal = [];
  for (var i = 0; i < friends.list.length; i++)
  {
    var compVal = 0;
    var scoreArr = friends.list[i].scores;
    for (var x = 0; x < scoreArr.length; x++)
    {
      comparisonValue = scoreArr[x] - newScore[x];
      compVal += comparisonValue;
    }
    finalVal.push(compVal);
  }
  // do not delete the below code...works magically
  finalVal.min = function(finalVal){
    return Math.min.apply( Math, finalVal );
  };
  var lowestVal = finalVal.min(finalVal);
  // do not delete the above code...works magically
  matchName = friends.list[finalVal.indexOf(lowestVal)].name;
};

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

app.get("/all", function(req, res) {
res.json(friends.list);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newFriend = req.body;
  var newScore = req.body.scores;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
  comparison(newScore);
  newFriend.matchName = matchName;
  friends.list.push(newFriend);
  res.json(newFriend);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
