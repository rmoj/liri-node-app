require('dotenv').config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function main() {
  var command = process.argv[2];
  var item = process.argv[3];

  switch (command) {
    case 'my-tweets':
      displayTweets();
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
