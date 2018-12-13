//dependecies
var axios = require("axios");
require("dotenv").config();

//keys
//var keys = require("keys.js");

var input = process.argv.slice(2).join(" ");

// vars for OMDB search functionality
var movieTitle = input;
var OMDBkey = process.env.OMDB_key;

axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + OMDBkey).then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
    console.log("The movie's year of release is: " + response.data.Year);
  }
);

// var spotify = new Spotify(keys.spotify);