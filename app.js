var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://' + process.env.USERNAME + ':' + process.env.PASSWORD + '@uglyart-4mz9y.mongodb.net/test?retryWrites=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected")
  // we're connected!
  var kittySchema = new mongoose.Schema({
    image: String
  });
  var Kitten = mongoose.model('Kitten', kittySchema);

  // Routes
  app.use(express.static(path.join(__dirname, 'js')));
  app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname + '/index.html'));
  });
  app.post('/', function(request, response) {
      console.log(request.body)
      var fluffy = new Kitten({ image: request.body.imgBase64 });
      fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        response.write("hi");
        response.end();
      });
  });

  // Listen
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log('Listening on localhost:'+ port);

});
