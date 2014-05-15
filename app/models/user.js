'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

class User{
  constructor(username){
    this.username = username; //when you use this, you create an object
    this.wood = 0;
    this.cash = 0;
  }

  static convertWood(a, fn){
    var userId = Mongo.ObjectID(a.userId);
    var wood = a.data;
    var money = a.data / 5;
    users.findOne({_id:userId}, (e, user)=>{
      if(user.wood >= 5 && wood <= user.wood){
        user.wood -= wood;
        user.cash += money;
        users.save(user, ()=>fn(user));
      }
    });
  }

  static findUser(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (err, obj)=>{
      var user = _.create(User.prototype, obj);
      fn(user);
    });
  }

  static login(username, fn){ //static makes it a class method. passing it username and function
    username = username.trim().toLowerCase(); //normalizes username coming in
    users.findOne({username:username}, (e, user)=>{ //searches collection to see if a user already exists
      if(user){ //if it exists
        fn(user); //callback with user
      }else{ //if user doesnt exist
        user = new User(username); //when you use new it calls the constructor and builds a brand new object
        users.save(user, (e, u)=>{ //saves user to collection then call back function
          fn(user); //function passes u back
        });
      }
    });
  }
}

module.exports = User;
