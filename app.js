var express = require('express')
var morgan = require('morgan')
var request = require('request')

var app = express()

app.use(morgan('combined'))

morgan(':method :url :status :res[content-length] - :response-time ms')

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/news', function (req, res) {
  console.log('Serving news stories');
  var options = { method: 'GET',
    url: 'https://cryptopanic.com/api/v1/posts/',
    qs: { auth_token: '94f9eb0af8b419359b06518153901ac1b7833f0d' },
    headers:
     { 'Postman-Token': '9bc6d9b5-e839-4083-9c28-5d44c9c1ed5a',
       'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(JSON.parse(body).results);
    res.send(JSON.parse(body).results);
  });
})

app.listen(3001)
