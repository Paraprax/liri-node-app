//console.log('this is loaded');

module.exports.omdb = {
  key: process.env.OMDB_key,
};

module.exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

module.exports.concert = {
  id: process.env.concert_API
}