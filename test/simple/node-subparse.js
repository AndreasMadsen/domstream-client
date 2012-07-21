/**
 * Copyright (c) 2012 Andreas Madsen
 * MIT License
 */

describe('testing node subparser', blow.readyBind(function(done) {
  var assert = chai.assert;
  var content = '<r>' +
                  '<aa></aa>' +
                  '<ab>' +
                    '<b></b>' +
                  '</ab>' +
                  '<ac></ac>' +
                '</r>';

  common.createContent(content, function (content) {
    var doc = domstream(content);

    // find and check node
    var root = doc.find().only().elem('r').toValue().getParent();
    while (!root.isRoot()) {
      root = root.getParent();
    }
    assert.ok(root.elem === doc.tree);

    var ElemAB = doc.find().only().elem('ab').toValue();
    assert.ok(ElemAB.elem === content.getElementsByTagName('ab')[0]);

    describe('when inserting content', function () {
      describe('beforebegin', testResult({
        expect: '<r><aa></aa><ta></ta><ab><b></b></ab><ac></ac></r>',

        topic: function () {
          return ElemAB.insert('beforebegin', '<ta></ta>');
        }
      }));

      describe('afterbegin', testResult({
        expect: '<r><aa></aa><ta></ta><ab><tb></tb><b></b></ab><ac></ac></r>',

        topic: function () {
          return ElemAB.insert('afterbegin', '<tb></tb>');
        }
      }));

      describe('beforeend', testResult({
        expect: '<r><aa></aa><ta></ta><ab><tb></tb><b></b><tc></tc></ab><ac></ac></r>',

        topic: function () {
          return ElemAB.insert('beforeend', '<tc></tc>');
        }
      }));

      describe('afterend', testResult({
        expect: '<r><aa></aa><ta></ta><ab><tb></tb><b></b><tc></tc></ab><td></td><ac></ac></r>',

        topic: function () {
          return ElemAB.insert('afterend', '<td></td>');
        }
      }));
    });

    describe('when appending', function () {
      describe('content', testResult({
        expect: '<r><aa></aa><ta></ta><ab><tb></tb><b></b><tc></tc><te></te></ab><td></td><ac></ac></r>',

        topic: function () {
          return ElemAB.append('<te></te>');
        }
      }));

      describe('content again', testResult({
        expect: '<r><aa></aa><ta></ta><ab><tb></tb><b></b><tc></tc><te></te><tf></tf></ab><td></td><ac></ac></r>',

        topic: function () {
          return ElemAB.append('<tf></tf>');
        }
      }));
    });

    describe('when overwriting', function () {
      describe('content', testResult({
        expect: '<r><aa></aa><ta></ta><ab><tb></tb><tc></tc></ab><td></td><ac></ac></r>',

        topic: function () {
          return ElemAB.setContent('<tb></tb><tc></tc>');
        }
      }));
    });

    describe('when removeing', function () {
      describe('content', testResult({
        expect: '<r><aa></aa><ta></ta><ab></ab><td></td><ac></ac></r>',

        topic: function () {
          return ElemAB.trim();
        }
      }));

      describe('element', testResult({
        expect: '<r><aa></aa><ta></ta><td></td><ac></ac></r>',

        topic: function () {
          return ElemAB.remove();
        }
      }));

      describe('root element', expectError(function () {
        root.remove();
      }));
    });

    done();
  });

  function testResult(batch) {
    var content = batch.expect;
    delete batch.expect;

    batch['the content should match'] = function (node, done) {
      common.createContent(content, function (content) {
        assert.strictEqual(node.document.tree.documentElement.innerHTML, content.documentElement.innerHTML);
        done();
      });
    };

    return createMochaTest(batch, {});
  }

  function createMochaTest(batch, prev) {
    return function () {

      if (batch.topic) {
        // setup topic
        var topic = batch.topic;
        delete batch.topic;

        var curr = {};
        before(function () {
          curr.result = topic(prev.result);
        });
      }

      for (var key in batch) (function (key) {
        if (batch[key] instanceof Function) {
          if (batch[key].length == 2) {
            it(key, function (done) {
              batch[key](curr.result, done);
            });
          } else {
            it(key, function () {
              batch[key](curr.result);
            });
          }
        } else {
          describe(key, createMochaTest(batch[key], curr));
        }
      })(key);
    };
  }

  function expectError(fn) {
    return function () {
      it('should throw an error', function () {
        var error = null;
        try {
          fn();
        } catch (e) {
          error = e;
        } finally {
            assert.instanceOf(error, Error);
        }
      });
    };
  }
}));
