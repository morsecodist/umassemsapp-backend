var express = require('express');
var app = express();

var request = require('request');

var redis = require('redis');
var client = redis.createClient({host: process.env.HOST, port: '14303', password: process.env.SECRET});

console.log(process.env.SECRET)

var routes = require('./routes/index');

app.use('/', routes);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

setInterval(function(){
  request("https://script.google.com/macros/s/AKfycbztVcC1-T5tjTd8CQyIptJovEZDIQRNSz1JnwICh10_oQPUHDg/exec?id=1c341g1M8VwbovXexk9H9Fh7CK2WhnOaGQV1VzZrfAho", function(error, response, body) {
    if (error) throw error;
    try{
      JSON.parse(body);
      client.set("content", body);
    } catch(err) {
      console.log(err);
    }
  });
}, 5000);

setInterval(function(){
  request("https://script.google.com/macros/s/AKfycbzYD_i_sRsJ47062S1KHT9lPpELKrL4pilZLMe4LLW5-F8InzOG/exec?id=189rTX1Y5b_CAmvBcBXo2NZeNAxCil0vG5-nHHa69r0o", function(error, response, body) {
    if (error) throw error;
    try{
      JSON.parse(body);
      client.set("shifts", body);
    } catch(err) {
      console.log('First', err);
    }
  });
}, 1000)
