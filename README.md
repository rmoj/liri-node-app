# LIRI Bot

LIRI Bot allows you to display data from Twitter, Spotify, and OMDB right from the command line.

## Instructions

In the console, user type any of the following commands shwon below:

`node liri.js my-tweets`
`node liri.js spotify-this-song <song name>`
`node liri.js movie-this <movie name>`
`node liri.js do-what-it-says`

"my-tweets" shows user's last 20 tweets and when they were created.

"spotify-this-song" shows song information from Spotify which includes Artist(s), a preview link, and the album the song is from.

"movie-this" shows movie information from the OMDB which includes the year the movie came out, IMDB rating, Rotten Tomatoes rating, country where movie was produced, language, plot, and actors.

"do-what-it-says" runs a command stored in a text file.

## Built With

- [Node](https://nodejs.org/)
- [Twitter for Node.js](https://www.npmjs.com/package/twitter)
- [Node Spotify API](https://www.npmjs.com/package/node-spotify-api)
- [Request - Simplified HTTP client](https://www.npmjs.com/package/request)
- [dotenv](https://www.npmjs.com/package/dotenv)
