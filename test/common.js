/**
 * Copyright (c) 2012 Andreas Madsen
 * MIT License
 */

(function () {
  window.common = {
    createTemplate: function (callback) {
      var body = document.getElementsByTagName('body')[0];

      var elem = document.createElement('iframe');
          elem.style.display = 'none';

      elem.setAttribute('src', '/static?src=fixture/template.html');

      elem.onload = function() {
        callback(elem.contentDocument || elem.contentWindow.document);
        body.removeChild(elem);
      };

      body.appendChild(elem);
    },

    createContent: function (content, callback) {
      var body = document.getElementsByTagName('body')[0];

      var elem = document.createElement('iframe');
          elem.style.display = 'none';

      elem.onload = function() {
        var doc = elem.contentDocument || elem.contentWindow.document;
        body.removeChild(elem);

        doc.write(content);

        callback(doc);
      };

      body.appendChild(elem);
    }
  };
})();
