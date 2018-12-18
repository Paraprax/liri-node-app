//dependecies
var axios = require("axios");
var Spotify = require('node-spotify-api');
require("dotenv").config();

//keys
//var keys = require("keys.js");

//arguments following node keyword and program name become the input string
var input = process.argv.slice(2);

//code to embolden certain console.logged words in the Terminal for user readability
var beginBold = '\033[1m'; 
var endBold = '\033[0m';
// unicode emoji lines to frame output-blocks for user readability:
var concertBumpers = ("\n🎟 🎟 🎟 🎟 🎟 🎟 🎟 🎟 🎟 🎟 🎟 🎟\n");
var movieBumpers = ("\n🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥 🎥\n");
var songBumpers = ("\n🎶 🎶 🎶 🎶 🎶 🎶 🎶 🎶 🎶 🎶 🎶 🎶\n");


// ~ ~ ~ ~ ~ ~ ~ ~ switch-case for calling functions based on user input: ~ ~ ~ ~ ~ ~
switch(input[0]) {
    case "movie-this":
        searchOMDb();
        break;
    case "concert-this":
        searchBandsInTown();
        break;
    case "spotify-this-song":
        searchSpotify();
        break;
    case "do-what-it-says":
        console.log("I'm afraid I can't do that.... yet.")
        break;
    default:
      console.log("Please enter a command....")
}
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~   

//===================== function definitions: =====================================

//'movie-this' command will call:
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
            console.log(movieBumpers);
            console.log(beginBold + "Title: " + endBold + response.data.Title);
            console.log(beginBold + "Release year: " + endBold + response.data.Year);
            console.log(beginBold + "IMDb user rating(out of 10): " + endBold + response.data.imdbRating);
            console.log(beginBold + "RottenTomatoes score(out of 100%): " + endBold + response.data.Ratings[1].Value); //<- well this one took a lot of trial and error to figure out how to reference....
            console.log(beginBold + "Country of production: " + endBold + response.data.Country);
            console.log(beginBold + "Language: " + endBold + response.data.Language);
            console.log(beginBold + "Plot synopsis: " + endBold + response.data.Plot);
            console.log(beginBold + "Starring: " + endBold + response.data.Actors);
            console.log(movieBumpers);

        }
    );
};

//'spotify-this-song' command will call:
function searchSpotify() {

    var songTitle = ""; // var to be set by user input and submitted to the search method
    var spotKey = process.env.SPOTIFY_ID; // reference the secret keys in our env file
    var spotSecret = process.env.SPOTIFY_SECRET;

    var spotify = new Spotify({ //new instance of spotify via constructor
        id: spotKey,
        secret: spotSecret,
    });


    // if-else setup to use a default song if nothing is input after the song-this command
    if (input[1] === undefined) {
        songTitle = "The Sign Ace"; //viable string for returning "The Sign" by Ace Of Base
    } else {
        songTitle = input.slice(1).join(' '); //otherwise the title will be built by joining the rest of the inputs into a string with each item separated by a space
    }
    
    spotify
    .search({ type: 'track', query: songTitle})
    .then(function(response) {

        if (response.tracks.items[0] === undefined) 
        {
            console.log(songBumpers);
            console.log("\n" + beginBold + songTitle + endBold + "? Sorry, I don't know that song! Maybe if I heard it....");  
            console.log(songBumpers); 
                return;
        } 
        else 
        {
        console.log(songBumpers);
        console.log(beginBold + "Song title: " + endBold + response.tracks.items[0].name);
        console.log(beginBold + "Artist: " + endBold + response.tracks.items[0].album.artists[0].name);
        console.log(beginBold + "Album: " + endBold + response.tracks.items[0].album.name);
        console.log(beginBold + "Listen on Spotify at: " + endBold + "https://open.spotify.com/track/" + response.tracks.items[0].uri.substring(14,36)); //substring method used to target specific 22-char id part of link-object, which is concat'd into a URL the user can copy/paste into a browser
        console.log(songBumpers);
        }

    
  })

}

//'concert-this' command will call:
function searchBandsInTown() {
    // vars to build url string for axios:
    var artistName = "";
    var bandsID = process.env.BANDS_ID;

    if (input[1] === undefined) {
        artistName = "Loverboy";
    } else {
        artistName = input.slice(1).join(" "); //input string with each item separated by a space
    }

    //axios request:
    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + bandsID).then(
        function(response, error) { 
            
            if (error) {
              console.log("Sorry, we don't know that band! Are you sure you're spelling it right?");   
                return;
            }

            var parsedDate = ""; // format date and time into English

            //successful query returns block of console logs with strings formatted for readability(in the terminal, anyway)
                console.log(concertBumpers);

                for (var i = 0; i < 5; i++){ // loop to return data on the first five concerts returned by the app

                    if (response.data[i] === undefined) {
                        console.log("I'm afraid I can't find any upcoming concerts for " + beginBold + artistName + " " + endBold + "at this time....");   
                        console.log(concertBumpers);  
                        return;
                      }

                    if (i === 0) {
                        console.log(beginBold + artistName + endBold + "'s next concerts are:[up to five]");
                    }

                    console.log("\n"+ (i + 1) + ":"); //output result-number will start at "1" for readability
                    console.log(beginBold + "Venue: " + endBold + response.data[i].venue.name);
                    console.log(beginBold + "Location: " + endBold + response.data[i].venue.city 
                                + ", " + response.data[i].venue.region 
                                + ", " + response.data[i].venue.country 
                                + ", " + response.data[i].venue.latitude
                                + ", " + response.data[i].venue.longitude
                                );
                    console.log(beginBold + "Concert date: " + endBold + response.data[i].datetime);
                }

                console.log(concertBumpers);

        }
    );
};