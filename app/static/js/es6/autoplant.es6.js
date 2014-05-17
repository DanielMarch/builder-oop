/* global ajax */

(function(){
  'use strict';

  init();

  function init(){
    $('#autoplant').click(plant);
  }

  var isOn = false;
  var timer;

  function plant(){
    isOn = !isOn;
    $('#autoplant').toggleClass('on');

    if(isOn){
      start();
    }else{
      clearInterval(timer);
    }
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(planting, 1000);
  }

  function planting(){
    var count = $('#forest').children().length;
    if(count <= 49){
      var userId = $('#userId').attr('data-id');
      ajax('/trees/plant', 'post', {userId:userId}, h =>{
        $('#forest').append(h);
      });
    }
  }

})();
