"use strict";

var React = require('react');
var express = require('express');
var path = require('path');

var app = express();

var ReactApp = React.createFactory(require('../views/app.jsx'));

// Include static assets.
app.use(express.static(__dirname, 'public'));
app.set('views', path.join(__dirname, 'views'));


app.get('/', function(req, res){
    var reactHTML = React.renderToString(ReactApp({}));

    res.send(reactHTML)
});

app.use(express.static('./public'));

let port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});
