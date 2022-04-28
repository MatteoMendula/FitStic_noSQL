const express = require('express');
const app = express();

const path = require('path');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/get_data', function(req, res){
    var tagline = "No programming concept is complete without a cute animal mascot.";
    res.json(tagline);
});


app.listen(8080);
console.log('Server is listening on port 8080');