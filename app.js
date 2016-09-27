var express = require('express'),
fs = require('fs'),
handlebars = require('express-handlebars'),

app = express();

var p5= require('./public/js/sketch');
var github = require('./routes/github');
app.use(express.static("public"));
app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
var repositories = github.repos();
app.get('/', function(req, res){
  // fs.writeFileSync('./public/data/repo.JSON', JSON.stringify(repositories));
  res.render('index', {repo: repositories});
});





var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Portfolio app listening at http://%s:%s', host, port);

});
