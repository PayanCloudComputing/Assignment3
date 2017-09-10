'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({apiVersion: '2006-03-01'});
const FS = require("fs");

const BUCKET = "cc414-images"
const KEY = "scientist.png"

var downloadParams = {
    Bucket: BUCKET,
    Key: KEY
};

S3.getObject(downloadParams, (error, data) => { //Download the image
    if(error) {
        console.log(error, error.stack);
    }
    else {
        FS.writeFile("scientist.png",data.Body); //Write the image
        console.log(data.Metadata); //See the Response Headers
        
        var uploadParams = {
            Bucket: BUCKET + "/23570",
            Key: KEY,
            Body: data.Body
        }
        
        if(data.Metadata.move) { //If the header move is true, upload the image
            S3.putObject(uploadParams, (error, data) => {
                if(error) {
                    console.log(error, error.stack);
                }
                else {
                    console.log(data);
                }
            });
        }
    }
});
