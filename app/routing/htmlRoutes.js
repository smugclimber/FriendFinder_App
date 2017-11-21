var path = require("path");

// Basic route that sends the user first to the AJAX Page
module.exports = function(app) {
  app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/home.html"));
  });

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
  });

  app.get("/all", function(req, res) {
  res.json(friends.list);
  });

};
