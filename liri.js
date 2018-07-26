require("dotenv").config();

var request = require('request');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var tweetArray = [];
var inputOption = process.argv[2];
var optionParameter = process.argv[3];


function specifyOption(option, optionParameter) {

    switch (option) {
        case 'my-tweets':
            getTweets();
            break;

        case 'spotify-this-song':
            spotifyThis(optionParameter);
            break;

        case 'movie-this':
            movieThis(optionParameter);
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}

function getTweets() {
    var params = {screen_name: 'BlaneA6', count: 20, exclude_replies:true, trim_user:true};
    
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (error) {
            console.log(error);
        } else {
            tweetArray = tweets;

            for (i = 0; i < tweetArray.length; i++) {
                console.log("Date: " + tweetArray[i].created_at);
                console.log("Tweet: " + tweetArray[i].text);
                console.log("----------------------------");

            }
        }
    });

}


function spotifyThis (song) {
    if(song === "") {
        song = "Tubthumping"
    }
    spotify.search({type: 'track', query: song}, function(err,data) {
        if (err) {
            console.log (err);
            return;
        }
        
        var song = data.tracks.items[0];
        
        console.log("---Artist---");
        
        for (i=0; i<song.artists.length; i++){
            console.log(song.artists[i].name);
        }

        console.log ("---Song---");
        console.log (song.name);

        console.log ("---Preview---");
        console.log (song.preview_url);

        console.log ("---Album---");
        console.log (song.album.name);
    });

}


function movieThis (movieName) {
        console.log (movieName);





}

specifyOption (inputOption, optionParameter);