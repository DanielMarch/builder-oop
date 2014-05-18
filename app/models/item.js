'use strict';

class Item{
  constructor(type){
    this.type = type;
    switch(type){
      case 'autogrow':
        this.cost = 50000;
        this.image = '/img/autogrow.png';
        break;
      case 'autoplant':
        this.cost = 75000;
        this.image = '/img/autoplant.png';
        break;
      case 'autoroot':
        this.cost = 80000;
        this.image = '/img/autoroot.png';
        break;
      case 'house':
        this.cost = 100000;
        this.image = '/img/house.png';
        break;
      case 'mansion':
        this.cost = 250000;
        this.image = '/img/mansion.png';
        break;
      case 'castle':
        this.cost = 1000000;
        this.image = '/img/castle.png';
        break;
    }
  }
}

module.exports = Item;
