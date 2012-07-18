/**
 * Copyright (c) 2012 Andreas Madsen
 * MIT License
 */

(function () {
  window.common = {
    createTemplate: function (callback) {
      var elem = document.createElement('iframe');
          elem.style.display = 'none';

      elem.setAttribute('src', '/static?src=fixture/template.html');

      elem.onload = function() {
        callback(elem.contentDocument || elem.contentWindow.document);
      };

      document.getElementsByTagName('body')[0].appendChild(elem);
    }
  };
})();
