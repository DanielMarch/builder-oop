'use strict';

class Item{
  constructor(type){
    this.type = type;
    switch(type){
      case 'autogrow':
        this.cost = 50000;
        this.image = '/img/light.gif';
        break;
      case 'autoplant':
        this.cost = 75000;
        this.image = '/img/planting.gif';
        break;
      case 'autoroot':
        this.cost = 80000;
        this.image = '/img/rooter.gif';
        break;
      case 'house':
        this.cost = 100000;
        this.image = '/img/house.gif';
        break;
      case 'mansion':
        this.cost = 250000;
        this.image = '/img/mansion.gif';
        break;
      case 'castle':
        this.cost = 1000000;
        this.image = '/img/castle.gif';
        break;
    }
  }
}

module.exports = Item;
