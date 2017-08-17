var express = require('express'),
    handlebars = require('express-handlebars'),
    bodyParser = require('body-parser');

var firebase = require("firebase"),
    database = require('./routes/database'),
    date = require('./routes/date');

var servers = [{server: express(),timeMode: 15}, {server: express(),timeMode: 30}];

function hostServer(server, port) {
    server.listen(port, function() {
        var port = this.address().port;
        console.log('Appointment website listening at localhost:' + port);
    });
}

function setupServer() {
    database.init();
    for (var i = 0; i < servers.length; i++) {
        servers[i].server.use(express.static("public"));
        servers[i].server.use(bodyParser.urlencoded({
            extended: true
        }));
        servers[i].server.use(bodyParser.json());
        servers[i].server.engine('handlebars', handlebars({
            defaultLayout: 'main'
        }));
        servers[i].server.set('view engine', 'handlebars');
        hostServer(servers[i].server, 3000 + i);
        setupRoutes(servers[i].server, servers[i].timeMode);
    }
}

function setupRoutes(server, timeMode) {
    server.get('/', function(req, res) {
        database.fetchData(timeMode, function(data) {
            res.render('index' + timeMode, {
                data: data,
                date: date.fetchDate()
            })
        })
    })

    server.get('/:id', function(req, res) {
        database.remove(timeMode, req.params.id)
        res.redirect('/')
    });

    server.post('/', function(req, res) {
        database.add(timeMode, req.body);
        res.redirect('/')
    });
}

setupServer();
