const express = require('express');

const app = express();
app.use(express.static('.'));

console.log('Running static server at 3002');
app.listen(3002);