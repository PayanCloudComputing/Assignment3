'use strict';

const HTTPS = require('https');
const FS = require('fs');
const URL = 
    "https://api.nasa.gov/planetary/apod?api_key=ArbO7OpCyOOEpoa5hVgEjPtmIuUVwAuFb6JXhuZG";
const PATH = require('path');

//Getting picture from NASA's API
HTTPS.get(URL, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        let hdurl = parsedData.hdurl;
        let imgName = PATH.basename(hdurl);
        HTTPS.get(hdurl, (res) => {
            //Saving picture
            res.pipe(FS.createWriteStream(imgName));
        });
        //Printing picture's title
        if(parsedData.copyright) {
            console.log("Title: " + parsedData.title +
            " by " + parsedData.copyright);
        }
        else {
            console.log("Title: " + parsedData.title)
        }
      } catch (error) {
        console.error(error.message);
      }
    });
});
