'use strict';

let port = process.env.PORT || 8080;
let app = require('./app');
let Gun = require('gun');

app.use(Gun.serve);
let server = app.listen(port);
let gun = Gun({web: server});

console.log('Server started on port ' + port + ' with /gun');

module.exports = gun;
