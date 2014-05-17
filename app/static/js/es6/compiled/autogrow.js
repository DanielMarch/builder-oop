(function() {
  'use strict';
  init();
  function init() {
    $('#autogrow').click(grow);
  }
  var isOn = false;
  var timer;
  function grow() {
    isOn = !isOn;
    $('#autogrow').toggleClass('on');
    if (isOn) {
      start();
      $('#slider').noUiSlider({
        start: 4,
        range: {
          'min': 4,
          'max': 10000
        },
        serialization: {
          lower: [$.Link({target: $('#readout')})],
          format: {
            decimals: 0,
            mark: ','
          }
        }
      });
    } else {
      clearInterval(timer);
      $('#slider').empty();
      items();
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(growing, 1000);
  }
  function growing() {
    var data = parseInt($('#readout').text());
    $('.alive:not(.beanstalk)').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      ajax(("/trees/" + v + "/grow"), 'put', null, (function(h) {
        tree.replaceWith(h);
        var height = parseInt($(h).children('.height').text());
        if ($(h).hasClass('beanstalk')) {
          audioBeanStalk.play();
        }
        if (height >= data) {
          chopping();
        }
      }));
    }));
  }
  function chopping() {
    $('.alive:not(.beanstalk)').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      ajax(("/trees/" + v + "/chop"), 'put', null, (function(h) {
        tree.replaceWith(h);
        dashboard();
      }));
    }));
  }
})();

//# sourceMappingURL=autogrow.map
