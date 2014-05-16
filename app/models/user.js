'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

class User{
  constructor(username){
    this.username = username; //when you use this, you create an object
    this.wood = 0;
    this.cash = 0;
    this.items = [];
  }

  save(fn){
    users.save(this, ()=>fn());
  }

  purchase(item){
    if(item.cost <= this.cash){
      this.cash -= item.cost;
      this.items.push(item);
    }
  }

  get isAutoGrowAvailable(){
    var present = _(this.items).any(i=>i.type === 'autogrow'); //lodash checks whether autogrow is present within the this.items array
    return (this.cash >= 50000) && (!present);
  }

  static convertWood(a, fn){
    var userId = Mongo.ObjectID(a.userId);
    var wood = a.data;
    var money = a.data / 5;
    this.findUser(userId, (user)=>{
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
        user = _.create(User.prototype, user);
        fn(user); //callback with user
      }else{ //if user doesnt exist
        user = new User(username); //when you use new it calls the constructor and builds a brand new object
        users.save(user, ()=> fn(user));
      }
    });
  }
}

module.exports = User;
