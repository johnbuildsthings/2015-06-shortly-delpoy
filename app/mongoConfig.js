var mongo = require('mongoose');

mongo.connect('mongodb://localhost:27017/');

var db = {};

db.urls = mongo.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Integer
});

db.users = mongo.Schema({
  username: String,
  password: String
});

module.exports = db;