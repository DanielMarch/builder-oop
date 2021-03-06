/* jshint unused:false */
var audioChop, audioBeanStalk;

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  'use strict';
  $.ajax({url:url, type:type, data:data, success:success, dataType:dataType});
}

function dashboard(){
  'use strict';
  var userId = $('#userId').attr('data-id');
  ajax(`/dashboard/${userId}`, 'get', null, h=>{
    $('#dashboard').empty().append(h);
  });
}

function items(){
  'use strict';
  var userId = $('#userId').attr('data-id');
  ajax(`/items?userId=${userId}`, 'get', null, h =>{
    $('#items').empty().append(h);
  });
}

function forest(){
  'use strict';
  var userId = $('#userId').attr('data-id');
  ajax(`/trees?userId=${userId}`, 'get', null, h =>{
    $('#forest').empty().append(h);
  });
}

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#plant').click(plant);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#trade', convert);
    $('#dashboard').on('click', '#buyAutoGrow', buyAutoGrow);
    $('#dashboard').on('click', '#buyAutoPlant', buyAutoPlant);
    $('#dashboard').on('click', '#buyAutoRoot', buyAutoRoot);
    $('#dashboard').on('click', '#buyHouse', buyHouse);
    $('#dashboard').on('click', '#buyMansion', buyMansion);
    $('#dashboard').on('click', '#buyCastle', buyCastle);
    $('#forest').on('click', '.growb', grow);
    $('#forest').on('click', '.cut', chop);
    preloadAssets();
  }

  function buyHouse(){
    var userId = $('#userId').attr('data-id');
    ajax(`/users/${userId}/purchase/house`, 'put', null, h=>{
      $('#dashboard').empty().append(h);
      items();
    });
  }

  function buyMansion(){
    var userId = $('#userId').attr('data-id');
    ajax(`/users/${userId}/purchase/mansion`, 'put', null, h=>{
      $('#dashboard').empty().append(h);
      items();
    });
  }

  function buyCastle(){
    var userId = $('#userId').attr('data-id');
    ajax(`/users/${userId}/purchase/castle`, 'put', null, h=>{
      $('#dashboard').empty().append(h);
      items();
    });
  }

  function buyAutoRoot(){
    var userId = $('#userId').attr('data-id');
    ajax(`/users/${userId}/purchase/autoroot`, 'put', null, h=>{
      $('#dashboard').empty().append(h);
      items();
    });
  }

  function buyAutoGrow(){
    var userId = $('#userId').attr('data-id');
    ajax(`/users/${userId}/purchase/autogrow`, 'put', null, h=>{
      $('#dashboard').empty().append(h);
      items();
    });
  }

  function buyAutoPlant(){
    var userId = $('#userId').attr('data-id');
    ajax(`/users/${userId}/purchase/autoplant`, 'put', null, h=>{
      $('#dashboard').empty().append(h);
      items();
    });
  }

  function preloadAssets(){
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chop.mp3';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/beanstalk.mp3';
  }

  function convert(){
    var userId = $('#userId').attr('data-id');
    var data = $('#woodtrade').val();
    ajax('/convert', 'post',{data:data, userId:userId}, h=>{
      $('#dashboard').empty().append(h);
    });
  }

  function chop(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/chop`, 'put', null, h=>{
      tree.replaceWith(h);
      dashboard();
    });
    audioChop.play();
  }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, h=>{
      tree.replaceWith(h);
      if($(h).hasClass('beanstalk')){
        audioBeanStalk.play();
      }
    });
  }

  function plant(){
    var userId = $('#userId').attr('data-id');
    ajax('/trees/plant', 'post', {userId:userId}, h =>{
      $('#forest').append(h);
    });
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, h =>{
      $('#dashboard').empty().append(h);
      forest();
      items();
    });
  }
})();
