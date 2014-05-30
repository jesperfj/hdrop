var dotenv = require('dotenv');
dotenv.load();
var express = require('express');
var app = express();
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.accessKeyId = process.env.ACCESSKEY
AWS.config.secretAccessKey = process.env.SECRETKEY
var s3 = new AWS.S3();
var uuid = require('node-uuid');


console.log('bucket: '+process.env.BUCKETNAME)
app.get('/', function(req, res){
  var key = uuid.v4();
  console.log("key="+key)
  s3.getSignedUrl('putObject', {Bucket: process.env.BUCKETNAME, Key: key, Expires: 600 }, function (puterr, puturl) {
    if(puterr) {
      console.log("Error while getting put url")
      console.log(puterr);
      res.send(500);
    } else {
      console.log('put URL: ', puturl);
      s3.getSignedUrl('getObject', {Bucket: process.env.BUCKETNAME, Key: key, Expires: 600 }, function (geterr, geturl) {
        if(geterr) {
          console.log("Error while getting get url")
          console.log(geterr);
          res.send(500);
        } else {
          console.log('get URL: ', geturl);
          res.json({ get: geturl, put: puturl })
        }
      });
    }
  });
});

app.listen(process.env.PORT || 5000);
