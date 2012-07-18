/**
 * Copyright (c) 2012 Andreas Madsen
 * MIT License
 */

describe('testing deep document search', blow.readyBind(function(done){
  var assert = chai.assert;

  common.createTemplate(function (content) {
    var doc = domstream(content);

    var menuElem = content.getElementsByTagName('menu')[0];
    var itemsElem = menuElem.getElementsByTagName('li');

    describe('searching for menu', function () {
      var menu = doc.find().only().elem('menu').toValue();

      it('the result should match', function () {
        assert.ok(menu.elem === menuElem);
      });

      describe('when performing deep search on menu', function () {
        var items = menu.find().elem('li').toValue();

        it('only subchildrens should be found', function () {
          assert.lengthOf(items, 3);

          for (var i = 0, l = items.length; i < l; i++) {
            assert.ok(items[i].elem === itemsElem[i]);
          }
        });
      });
    });

    done();
  });
}));
