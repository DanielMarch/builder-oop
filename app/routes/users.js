'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Item = traceur.require(__dirname + '/../models/item.js');

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

exports.items = (req, res)=>{
  var userId = req.query.userId;
  User.findUser(userId, (user)=>{
    res.render('user/items', {user:user});
  });
};

exports.convert = (req, res)=>{
  User.convertWood(req.body, user=>{
    res.render('user/dashboard', {user:user});
  });
};

exports.purchase = (req, res)=>{
  User.findUser(req.params.userId, user=>{
    var item = new Item(req.params.item);
    user.purchase(item);
    user.save(()=>{
      res.render('user/dashboard', {user:user});
    });
  });
};
