/*
Purpose:Upload files to cloudinary cdn from nodejs
Tutorial:http://wp.me/p82htC-eX
*/

const express = require('express');
let app = express();
const chokidar = require('chokidar');
const filepath = '/static/images/';
let watcher = chokidar.watch(filepath, {
  ignored: /[\/\\]\./, persistent: true
});

let log = console.log.bind(console);
let scanComplete = false;
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'modii',
  api_key: '575252697537226',
  api_secret: 'Hu00c2H-v3nO1G2eyNRxNln2Vcw'
});
watcher
  .on('add', function (path) {
    if (scanComplete) {
      let pathArray = path.split('/');
      if (!pathArray[pathArray.length - 1].includes("crdownload")) {
        log('File', path, 'has been added');
        // console.log(pathArray.length, pathArray[pathArray.length - 2]);
        let destfolder = pathArray[pathArray.length - 2];
        let destfileName = pathArray[pathArray.length - 1];
        cloudinary.v2.uploader.upload(path, {
          folder: destfolder,
          use_filename:true,
          tags:[destfolder]
        }, function (error, result) {
          if (error) {
            console.log("error ocurred", error);
          }
          else {
            console.log("result of upload \n", result.secure_url,"\n insecure url: \n",result.url);
          }
        });
      }
    }
  })
  .on('addDir', function (path) {
    // log('Directory', path, 'has been added'); 
  })
  .on('error', function (error) { log('Error happened', error); })
  .on('ready', function () {
    log('Initial scan complete. Ready for changes.');
    scanComplete = true;
  })
  .on('raw', function (event, path, details) {
    // log('Raw event info:', event, path, details);
  })


let port = process.env.PORT || 5000;
app.listen(port);
console.log("serve listening on port", port);