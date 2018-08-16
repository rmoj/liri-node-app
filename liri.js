require('dotenv').config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

main();

function main() {
  var command = process.argv[2];
  var item = process.argv[3];

  if (command === 'do-what-it-says') {
    getCommand('random.txt');
  } else {
    executeCommand(command, item);
  }
}

function getCommand(file) {
  var fs = require('fs');
  fs.readFile(file, 'utf8', function(error, data) {
    if (error) {
      return console.log(error + '\n');
    }

    var cmd = data.split(',');
    if (cmd[1]) {
      cmd[1] = cmd[1]
        .toString()
        .replace(/"/g, '')
        .trim();
    }

    executeCommand(cmd[0], cmd[1]);
  });
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

function getSong(song) {
  var spotify = new Spotify(keys.spotify);

  if (!song) {
    console.log('No song selected');
    song = 'The Sign';
  }

  spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
      var tracks = response.tracks.items;

      tracks.forEach(function(track) {
        if (track.name.toLowerCase() === song.toLowerCase()) {
          displaySong(track);
        }
      });
      console.log('\n');
    })
    .catch(function(err) {
      console.log(err + '\n');
    });
}

function displaySong(track) {
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

function getMovie(movie) {
  var request = require('request');

  var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie;

  request(queryURL, function(error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log(body);
    console.log('body:' + JSON.stringify(JSON.parse(body), null, 2));
    displayMovie(JSON.parse(body));
  });
}

function displayMovie(movie) {
  console.log('\nTitle: ' + movie.Title);
  console.log('Year: ' + movie.Year);
  console.log('IMDB Rating: ' + movie.imdbRating);
  console.log('Rotten Tomatoes Rating: ' + movie.Ratings[1].Value);
  console.log('Language: ' + movie.Language);
  console.log('Plot: ' + movie.Plot);
  console.log('Actors: ' + movie.Actors + '\n');
}

function executeCommand(command, item) {
  switch (command) {
    case 'my-tweets':
      displayTweets('rmoj99');
      break;

    case 'spotify-this-song':
      getSong(item);
      break;

    case 'movie-this':
      getMovie(item);
      break;

    default:
      console.log('Unrecognized command.\n');
      break;
  }
}
