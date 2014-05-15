(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#login').click(login);
    $('#plant').click(plant);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#dashboard').on('click', '#trade', convert);
    $('#forest').on('click', '.growb', grow);
    $('#forest').on('click', '.cut', chop);
    $('#forest').on('click', '.heart', love);
  }
  function love() {
    alert('You have shown your tree love. You feel better, as does your tree');
  }
  function convert() {
    var userId = $('#userId').attr('data-id');
    var data = $('#woodtrade').val();
    ajax('/convert', 'post', {
      data: data,
      userId: userId
    }, (function(h) {
      $('#dashboard').empty().append(h);
    }));
  }
  function chop() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    var userId = $('#userId').attr('data-id');
    ajax(("/trees/" + treeId + "/chop"), 'put', null, (function(h) {
      tree.replaceWith(h);
      ajax(("/dashboard/" + userId), 'GET', null, (function(h) {
        $('#dashboard').empty().append(h);
      }));
    }));
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(h) {
      tree.replaceWith(h);
    }));
  }
  function forest() {
    var userId = $('#userId').attr('data-id');
    ajax(("/trees?userId=" + userId), 'get', null, (function(h) {
      $('#forest').empty().append(h);
    }));
  }
  function plant() {
    var userId = $('#userId').attr('data-id');
    ajax('/trees/plant', 'post', {userId: userId}, (function(h) {
      $('#forest').append(h);
    }));
  }
  function login() {
    var username = $('#username').val();
    ajax('/login', 'post', {username: username}, (function(h) {
      $('#dashboard').empty().append(h);
    }));
  }
  function ajax(url, type) {
    var data = arguments[2] !== (void 0) ? arguments[2] : {};
    var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
      return console.log(r);
    });
    var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
    $.ajax({
      url: url,
      type: type,
      data: data,
      success: success,
      dataType: dataType
    });
  }
})();

//# sourceMappingURL=game.map
