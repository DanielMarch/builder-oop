var audioChop,
    audioBeanStalk;
function ajax(url, type) {
  'use strict';
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
function dashboard() {
  'use strict';
  var userId = $('#userId').attr('data-id');
  ajax(("/dashboard/" + userId), 'get', null, (function(h) {
    $('#dashboard').empty().append(h);
  }));
}
function items() {
  'use strict';
  var userId = $('#userId').attr('data-id');
  ajax(("/items?userId=" + userId), 'get', null, (function(h) {
    $('#items').empty().append(h);
  }));
}
(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#login').click(login);
    $('#plant').click(plant);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#trade', convert);
    $('#dashboard').on('click', '#buyAutoGrow', buyAutoGrow);
    $('#forest').on('click', '.growb', grow);
    $('#forest').on('click', '.cut', chop);
    preloadAssets();
  }
  function buyAutoGrow() {
    var userId = $('#userId').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autogrow"), 'put', null, (function(h) {
      $('#dashboard').empty().append(h);
      items();
    }));
  }
  function preloadAssets() {
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chop.mp3';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/beanstalk.mp3';
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
    ajax(("/trees/" + treeId + "/chop"), 'put', null, (function(h) {
      tree.replaceWith(h);
      dashboard();
    }));
    audioChop.play();
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(h) {
      tree.replaceWith(h);
      if ($(h).hasClass('beanstalk')) {
        audioBeanStalk.play();
      }
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
      forest();
      items();
    }));
  }
})();

//# sourceMappingURL=game.map
