"use strict";

require('node-jsx').install({
    harmony: true,
    extension : ".jsx"
});

require("babel/register");

var app = require('./server/app');
