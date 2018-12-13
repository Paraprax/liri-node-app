//dependecies
var axios = require("axios");
require("dotenv").config();

//keys
//var keys = require("keys.js");

var input = process.argv.slice(2);

// console.log(input[0]); test to make sure command part of input is being read right

if (input[0] === "movie-this") {

    // vars for OMDB search functionality
    var movieTitle = input.slice(1).join(" ");

    var OMDBkey = process.env.OMDB_key;

    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + OMDBkey).then(
    function(response) {
        
        console.log(response.data);

        console.log("Title: " + response.data.Title);
        console.log("Release year: " + response.data.Year);
        console.log("Current IMDb user rating(out of 10): " + response.data.imdbRating);
        console.log("RottenTomatoes score(out of 100%): " + response.data.Ratings[1].Value); //well this one took a lot of trial and error to figure out how to reference....
        
    }
    );
}

// var spotify = new Spotify(keys.spotify);