require('dotenv').config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

main();

function main() {
  var command = process.argv[2];
  var item = process.argv[3];

  switch (command) {
    case 'my-tweets':
      displayTweets('rmoj99');
      break;

    case 'spotify-this-song':
      displaySong(item);
      break;

    case 'movie-this':
      displayMovie(item);
      break;

    case 'do-what-it-says':
      displayRandomSong();
      break;

    default:
      console.log('Unrecognized command.');
      break;
  }
}

function displayTweets(username) {
  var client = new Twitter(keys.twitter);
  var params = { screen_name: username };
  client.get('statuses/user_timeline', params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      tweets.forEach(function(tweet) {
        console.log(' ');
        console.log('Created: ' + tweet.created_at);
        console.log('Tweet: ' + tweet.text);
      });
    } else {
      console.log(error);
    }
  });
}

function displaySong(song) {
  var spotify = new Spotify(keys.spotify);

  spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
      // console.log(JSON.stringify(response, null, 4));

      var spotData = response.tracks.items;
      // console.log(Object.keys(songData[0]));

      spotData.forEach(function(track) {
        logSongData(track, song);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}
function logSongData(track, song) {
  if (track.name === song) {
    console.log('Song: ' + track.name);
    console.log('Album: ' + track.album.name);
    console.log('Preview: ' + track.preview_url);
    var artists = track.artists;
    var artistNames = '';
    artists.forEach(function(artist) {
      if (artistNames.length < 1 || artists.length == 1) {
        artistNames = artistNames + artist.name;
      } else {
        artistNames = artisNames + ', ' + artist.name;
      }
    });

    console.log(artistNames);
  }
}

function displayMovie(movie) {}

function displayRandomSong() {}
