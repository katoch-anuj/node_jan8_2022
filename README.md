# node_jan8_2022
https://stackoverflow.com/questions/18419144/npm-not-working-read-econnreset

weatherstack
mapbox


EXPRESS
it is a framework for nodejs.
cont express = require ('express');
express is not a object  but a function

To server html via express we need to provide absolute path and not relative path.
For this we have __dirname(path of directory where the file resides) and __filename(path of the file)
and another is "path"

 <link rel='stylesheet' href='./css/styles.css'> relative path
 <link rel='stylesheet' href='/css/styles.css'> absolute path here '/' is the web-server root which is public
 / means the root of the current drive;

./ means the current directory;