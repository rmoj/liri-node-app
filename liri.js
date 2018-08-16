require('dotenv').config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

main();

function main() {
  var command = process.argv[2];
  var item = process.argv[3];

  executeCommand(command, item);
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
        console.log('\nCreated: ' + tweet.created_at);
        console.log('Tweet: ' + tweet.text);
      });
    } else {
      console.log(error);
    }
    console.log('\n');
  });
}

function displaySong(song) {
  var spotify = new Spotify(keys.spotify);

  if (!song) {
    console.log('No song selected');
    song = 'The Sign';
  }

  spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
      var items = response.tracks.items;

      items.forEach(function(item) {
        if (item.name.toLowerCase() === song.toLowerCase()) {
          logSongData(item);
        }
      });
      console.log('\n');
    })
    .catch(function(err) {
      console.log(err + '\n');
    });
}

function logSongData(track) {
  var artists = track.artists;
  var artistNames = '';

  artists.forEach(function(artist) {
    if (artistNames.length < 1 || artists.length == 1) {
      artistNames = artistNames + artist.name;
    } else {
      artistNames = artistNames + ', ' + artist.name;
    }
  });
  console.log('\nArtist(s): ' + artistNames);
  console.log('Song: ' + track.name);
  console.log('Preview: ' + track.preview_url);
  console.log('Album: ' + track.album.name);
}

function displayMovie(movie) {}

function executeCommand(command, item) {
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

    default:
      console.log('Unrecognized command.\n');
      break;
  }
}

function doCommandOnFile() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      return console.log(error);
    }

    console.log(data);

    var arr = data.split(',');

    console.log(dataArr);
  });
}
