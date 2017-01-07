var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient({host: 'redis-14303.c10.us-east-1-2.ec2.cloud.redislabs.com', port: '14303', password: process.env.SECRET});

router.get('/content', function(req, res, next) {
  client.get('content', function(err, data){
    res.jsonp(JSON.parse(data));
  });
});

router.get('/shifts', function(req, res, next) {
  client.get('shifts', function(err, data){
    try{
      res.jsonp(JSON.parse(data));
    } catch(err) {
      console.log(data);
    }
  });
});

module.exports = router;