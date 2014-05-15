/* jshint unused:false */
(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#plant').click(plant);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#dashboard').on('click', '#trade', convert);
    $('#forest').on('click', '.growb', grow);
    $('#forest').on('click', '.cut', chop);
    $('#forest').on('click', '.heart', love);
  }

  function love(){
    alert('You have shown your tree love. You feel better, as does your tree');
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
    var userId = $('#userId').attr('data-id');

    ajax(`/trees/${treeId}/chop`, 'put', null, h=>{
      tree.replaceWith(h);
      ajax(`/dashboard/${userId}`, 'GET', null, h=>{
        $('#dashboard').empty().append(h);
      });
    });
  }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, h=>{
      tree.replaceWith(h);
    });
  }

  function forest(){
    var userId = $('#userId').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'get', null, h =>{
      $('#forest').empty().append(h);
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
    });
  }

  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
    $.ajax({url:url, type:type, data:data, success:success, dataType:dataType});
  }
})();
