var express = require('express'),
    handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var firebase = require("firebase");
var database = require('./routes/database');
var date = require('./routes/date');

var localhost1 = express();
var localhost2 = express();
var servers = [localhost1, localhost2];

function hostServer(server, port) {
    server.listen(port, function() {
        var port = this.address().port;
        console.log('Appointment website listening at localhost:' + port);
    });
}

function setupServer() {
    for (var i = 0; i < servers.length; i++) {
        servers[i].use(express.static("public"));
        servers[i].use(bodyParser.urlencoded({
            extended: true
        }));
        servers[i].use(bodyParser.json());
        servers[i].engine('handlebars', handlebars({
            defaultLayout: 'main'
        }));
        servers[i].set('view engine', 'handlebars');
        hostServer(servers[i], 3000 + i);
    }
}

database.init();
setupServer();

localhost1.get('/', function(req, res) {
    database.fetch15Minutes(function(data) {
        res.render('index', {
            data: data,
            date: date.fetchDate()
        });
    });
});

localhost1.get('/:id', function(req, res) {
    database.remove(15, req.params.id)
    res.redirect('/')
});
localhost1.post('/', function(req, res) {
    database.add(15, req.body);
    res.redirect('/')
});

localhost2.get('/', function(req, res) {
    database.fetch30Minutes(function(data) {
        res.render('index2', {
            data: data,
            date: date.fetchDate()
        });
    });
});

localhost2.get('/:id', function(req, res) {
  database.remove(30, req.params.id)
  res.redirect('/')
});

localhost2.post('/', function(req, res) {
  database.add(30, req.body);
  res.redirect('/')
});
