require('dotenv').config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);

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
        console.log('Created: ' + tweet.created_at);
        console.log(tweet.text);
      });
    } else {
      console.log(error);
    }
  });
}

function displaySong(song) {}

function displayMovie(movie) {}

function displayRandomSong() {}
