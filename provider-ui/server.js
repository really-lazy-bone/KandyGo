const express = require('express');

const app = express();
app.use(express.static('.'));
// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

console.log('Running static server at 3051');
app.listen(3051);