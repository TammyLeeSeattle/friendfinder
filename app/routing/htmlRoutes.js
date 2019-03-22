// Easy routing with express
var path = require ("path");

// pass in express ('app')
module.exports = function (app) {

    // when browser hits the /survey path, deliver the survey.html file
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });

    // catch all URL requests and return home.html
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    }); 

} // end of module exports