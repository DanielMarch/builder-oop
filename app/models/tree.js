'use strict';

var trees = global.nss.db.collection('trees');
var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree{
  constructor(userId){
    this.userId = userId;
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  save(fn){
    trees.save(this, ()=>fn());
  }

  purge(fn){
    trees.remove(this, ()=>fn());
  }

  grow(){
    var x = this.height * 0.10;
    var y = Math.round(200 - (this.height / 12) * 0.10);
    y = y < 10 ? 10 : y;

    if(this.height < 48){
      this.height += _.random(0,2,true);
      this.isHealthy = _.random(0, 200) !== 69;
    }else{
      this.height += _.random(0,x,true);
      this.isHealthy = _.random(0, y) !== 5;
    }
  }

  chop(){
    if(this.height >= 48){
      var UserId = this.userId;
      var wood = Math.round(this.height / 2);
      users.findOne({_id:UserId},(e,u)=>{
        u.wood += wood;
        users.save(u, (e, count)=>{
        });
      });
      this.height = 0;
      this.isHealthy = false;
      this.isChopped = true;
    }
  }

  get isBeanStalk(){
    return (this.height / 12) >= 10000;
  }

  get classes(){
    var classes = [];

    if(this.height === 0){
      classes.push('seed');
    }else if(this.height < 12){
      classes.push('sapling');
    }else if(this.height < 48){
      classes.push('teenager');
    }else{
      classes.push('adult');
    }

    if(!this.isHealthy){
      classes.push('dead');
    }else{
      classes.push('alive');
    }

    if(this.isChopped){
      classes.push('chop');
    }

    if(this.isBeanStalk){
      classes.push('beanstalk');
    }

    return classes.join(' ');
  }

  static findByTreeId(treeId, fn){
    treeId = Mongo.ObjectID(treeId);
    trees.findOne({_id:treeId}, (e, tree)=>{
      tree = _.create(Tree.prototype, tree);
      fn(tree);
    });
  }

  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((e, objs)=>{
      var forest = objs.map(o=>_.create(Tree.prototype, o)); //changes the tree obj's parent from object.prototype to Tree.prototype
      fn(forest);
    });
  }

  static plant(userId, fn){
    userId = Mongo.ObjectID(userId);
    var tree = new Tree(userId);
    trees.save(tree, ()=>fn(tree));
  }
}

module.exports = Tree;
