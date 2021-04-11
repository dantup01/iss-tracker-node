var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app)

app.use(express.static('iss'));

server.listen(PORT, function() {
    console.log('Server is running');
})

