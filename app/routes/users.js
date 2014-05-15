'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.login = (req, res)=>{
  User.login(req.body.username, user => {
    res.render('user/dashboard', {user:user});
  });
};

exports.dashboard = (req, res)=>{
  var userId = req.params.userId;
  User.findUser(userId, (user)=>{
    res.render('user/dashboard', {user:user});
  });
};

exports.convert = (req, res)=>{
  User.convertWood(req.body, user=>{
    res.render('user/dashboard', {user:user});
  });
};
