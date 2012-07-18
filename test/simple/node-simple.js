/**
 * Copyright (c) 2012 Andreas Madsen
 * MIT License
 */

var assert = chai.assert;

describe('testing node simple', blow.readyBind(function(done){
  common.createTemplate(function (content) {
    var doc = domstream(content);

    describe('when getting tagName form element', function () {
      var result = doc.find().only().elem('html').toValue().tagName();

      it('expect value', function () {
        assert.equal(result, 'html');
      });
    });

    describe('when getting tagName from root', expectError(function () {
      doc.find().only().elem('html').toValue().getParent().tagName();
    }));

    describe('when getting content form singleton element', expectError(function () {
      doc.find().only().elem('input').toValue().getContent();
    }));

    describe('when getting content normal element', function () {
      var result = doc.find().only().elem('footer').toValue().getContent();

      it('expect value', function () {
        assert.equal(result, 'Bottom');
      });
    });

    describe('when checking for missing attribute', function () {
      var result = doc.find().only().elem('html').toValue().hasAttr('missing');

      it('expect false', function () {
        assert.isFalse(result);
      });
    });

    describe('when checking for existing attribute', function () {
      var result = doc.find().only().elem('html').toValue().hasAttr('lang');

      it('expect true', function () {
        assert.isTrue(result);
      });
    });

    describe('when reading missing attribute', function () {
        var result = doc.find().only().elem('html').toValue().getAttr('missing');

      it('expect null', function () {
        assert.isNull(result);
      });
    });

    describe('when reading existing attribute', function () {
      var result = doc.find().only().elem('html').toValue().getAttr('lang');

      it('expect value', function () {
        assert.equal(result, 'en');
      });
    });

    describe('when getting parent form element', function () {
      var result = doc.find().only().elem('head').toValue().getParent();

      it('expect parent node', function () {
        assert.ok(result === doc.find().only().elem('html').toValue());
      });
    });

    describe('when getting parent from root', expectError(function () {
      doc.find().only().elem('html').toValue().getParent().getParent();
    }));

    describe('when getting children from singleton element', expectError(function () {
      doc.find().only().elem('input').toValue().getChildren();
    }));

    describe('when getting children from normal element', function () {
      var list = doc.find().only().elem('html').toValue().getChildren();

      it('expect child list', function () {
        assert.lengthOf(list, 2);
        assert.ok(list[0].elem === content.getElementsByTagName('head')[0]);
        assert.ok(list[1].elem === content.getElementsByTagName('body')[0]);
      });
    });

    describe('when executeing isRoot on element', function () {
      var result = doc.find().only().elem('html').toValue().isRoot();

      it('expect false', function () {
        assert.isFalse(result);
      });
    });

    describe('when executeing isRoot on root', function () {
      var result = doc.find().only().elem('html').toValue().getParent().isRoot();

      it('expect true', function () {
        assert.isTrue(result);
      });
    });

    describe('when executeing isSingleton on normal element', function () {
      var result = doc.find().only().elem('div').toValue().isSingleton();

      it('expect false', function () {
        assert.isFalse(result);
      });
    });

   describe('when executeing isSingleton on singleton element', function () {
      var result = doc.find().only().elem('input').toValue().isSingleton();

      it('expect true', function () {
        assert.isTrue(result);
      });
    });

    describe('when executeing isParentTo on normal child element', function () {
      var html = doc.find().only().elem('html').toValue();
      var body = doc.find().only().elem('body').toValue();

      var result = html.isParentTo(body);

      it('expect true', function () {
        assert.isTrue(result);
      });
    });

    describe('when executeing isParentTo on normal none-child element', function () {
      var body = doc.find().only().elem('body').toValue();
      var head = doc.find().only().elem('head').toValue();

      var result = body.isParentTo(head);

      it('expect false', function () {
        assert.isFalse(result);
      });
    });

    describe('when executeing isParentTo on singleton element', function () {
      var html = doc.find().only().elem('html').toValue();
      var input = doc.find().only().elem('input').toValue();

      var result = input.isParentTo(html);

      it('expect false', function () {
        assert.isFalse(result);
      });
    });


    function expectError(fn) {
      return function () {
        var error = null;
        try {
          fn();
        } catch (e) {
          error = e;
        } finally {
          it('should throw an error', function () {
            assert.instanceOf(error, Error);
          });
        }
      };
    }

    done();
  });
}));
