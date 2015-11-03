'use strict';

var db = require('./database.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var connect = require('connect');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send("Hello World!");
});

app.get('/projects', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  db.projectModel.find(function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.get('/projects/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  db.projectModel.findById(req.params.id, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/projects', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var newProject = new db.projectModel(req.body);
  newProject.save(function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(req.body);
    }
  });
});

app.put('/projects/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  db.projectModel.update({
    _id: req.params.id
  }, req.body, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(req.body));
    }
  });
});

app.listen(8080);