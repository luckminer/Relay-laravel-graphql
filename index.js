// Any files that are required in after this line will be transpiled with babel
require('babel-register');

// run the main server file through the babel register to allow ES6
module.exports = require('./server/server.js');
