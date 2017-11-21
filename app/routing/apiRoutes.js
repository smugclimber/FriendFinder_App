var express = require("express");
var path = require("path");
var app = express();

module.exports = function(app) {
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
}
