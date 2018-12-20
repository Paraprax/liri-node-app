# liri-node-app

- - - -

**Language Interpretation and Recognition Interface**

A JavaScript Command-Line-Interface for returning info on movies, songs and upcoming concerts based on user input.

As all three API's queried by the app required permissions, keys must be obtained by the user and added to your own, local, .env file, which will be referenced by the app via "keys.js".

- - - -

**To use,** run in the terminal with node and enter one of four commands, followed by a film title, song title or band name:

**- "node liri.js movie-this [film title]"** will print the title, year, reception ratings, country of production, language, plot summary and cast list of that film to the terminal.

**- "node liri.js spotify-this-song [song title]"** will print the title, artist, and album of that song and a link to access the song(on Spotify's website).

**- "node liri.js concert-this [band name]"** will print the venue name, location, date and time of (up to) their next five concerts, if they are currently touring.

**- "node liri.js do-what-it-says"** will automatically run the contents of the "random.txt" file as its input, performing one of the other three functions based what random.txt contains.

If nothing is entered the after the **"-this"** command, the app will search for placeholder items hardcoded into the app. If the queries return undefined objects instead of data, the app will inform the user nothing could be found(instead of throwing an error).

Some of the basic info returned from each successful search is automatically appended to the included "log.txt" film each time a search is run.

Watch a video of liri.js in action [here!](https://drive.google.com/file/d/1r9R-tQCvn224tjDXiUCYia0OdE0ilKR9/view)

See screenshots of examples of liri's output [here!](https://drive.google.com/drive/folders/1zaVS4VwpYCaRgNOHE530fRTKodbD5GEe)