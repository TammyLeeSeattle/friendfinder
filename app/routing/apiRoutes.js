var friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000 // the difference between the user's answers and dog's answers
        };

        // parse the results of the user's survey answers
        var userData = req.body;
        var userScores = userData.scores;

            // testing
            console.log(userScores);

        // calculate the difference between user's scores and scores of each dog friend
        var totalDifference = 0;

        // loop through all dog friends in the db
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i]);
            totalDifference = 0;

            // loop through all scores of each dog friend
            for (var j = 0; j < friends.length; j++) {

                // find difference between scores and add them together
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // if sum of differences is less than the difference of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // reset bestMatch object to the properties of new dog friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }

            } // end of each dog friend for loop

        } // end of all dog friends for loop


        // save user's data to the db
        friends.push(userData);

        // return a JSON object with user's bestMatch
        res.json(bestMatch);


    }); // end of app.post

}; // end of module exports