var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var db = mongojs("npvdb", ["npvs"])
var app = express();


// app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  render('index')
});

app.get('/npvs', function (req, res) {
  res.send([]);
});

app.post('/npvs', function (req, res) {
  // var npv = req.body;
  // console.log(npv);
  db.npvs.insert(req.body, function(err, data){
    console.log(data);
    res.end(JSON.stringify(data));
  }); 
});



var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('app listening at http://%s:%s', host, port)

})