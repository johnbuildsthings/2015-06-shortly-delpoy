var app = require('./server-config.js');

var port = process.env.SHORTLY_PORT;

app.listen(port);

console.log('Server now listening on port ' + port);
