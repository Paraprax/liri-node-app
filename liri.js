//dependecies
var axios = require("axios");
require("dotenv").config();

//keys
//var keys = require("keys.js");

var input = process.argv.slice(2);

// ~ ~ ~ ~ ~ ~ ~ ~ switch-case for calling functions based on user input: ~ ~ ~ ~ ~ ~
switch(input[0]) {
    case "movie-this":
        searchOMDb();
        break;
    case "concert-this":
        console.log("I'm afraid I can't do that.... yet.")
        break;
    case "spotify-this-song":
        console.log("I'm afraid I can't do that.... yet.")
        break;
    case "do-what-it-says":
        console.log("I'm afraid I can't do that.... yet.")
        break;
    default:
      console.log("Please enter a command....")
}
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~   

//===================== function definitions: =====================================

function searchOMDb() {
    // vars to build url string for axios:
    var movieTitle = "";
    var OMDBkey = process.env.OMDB_key;

    /* if nothing is entered after the 'movie-this' command, Jaco Van Dormael's criminally-underrated 
    surrealist sci-fi masterpiece 'Mr. Nobody' will be assigned to the movieTitle var by default */
    if (input[1] === undefined) {
        movieTitle = "Mr. Nobody";
    } else {
        movieTitle = input.slice(1).join(" "); //otherwise the title will be built by joining the rest of the inputs into a string with each item separated by a space
    }

    //axios request:
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + OMDBkey).then(
        function(response) { 
            
            /* if (error) {
                console.log("Sorry, we don't know that movie! Are you sure you're spelling it right?");   
                return;
            } */

            //successful query returns block of console logs with strings formatted for readability(in the terminal, anyway)
            console.log("\n🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥\n");
            console.log("Title: " + response.data.Title);
            console.log("Release year: " + response.data.Year);
            console.log("IMDb user rating(out of 10): " + response.data.imdbRating);
            console.log("RottenTomatoes score(out of 100%): " + response.data.Ratings[1].Value); //<- well this one took a lot of trial and error to figure out how to reference....
            console.log("Country of production: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot synopsis: " + response.data.Plot);
            console.log("Starring: " + response.data.Actors);
            console.log("\n🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥\n");

        }
    );
};

// var spotify = new Spotify(keys.spotify);