var mongo = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var crypto = require('crypto');

mongo.connect('mongodb://localhost:27017/');

module.exports.db = mongo.connection;

var Url = new mongo.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

Url.methods.hash = function(){
  var shasum = crypto.createHash('sha1');
  shasum.update(model.get('url'));
  model.set('code', shasum.digest('hex').slice(0, 5));
}



var User = new mongo.Schema({
  username: String,
  password: String
});

User.methods.hashPassword = function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

User.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};



module.exports.users = User;
module.exports.urls = Url;