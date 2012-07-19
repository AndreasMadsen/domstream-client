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
    assert.ok(root.elem === content);

    var ElemAB = doc.find().only().elem('ab').toValue();
    assert.ok(ElemAB.elem === content.getElementsByTagName('ab')[0]);

    describe('when inserting content beforebegin', testResult(function () {
      return ElemAB.insert('beforebegin', '<ta></ta>');
    }, '<r><aa></aa><ta></ta><ab><b></b></ab><ac></ac></r>'));

    describe('when inserting content afterbegin', testResult(function () {
        return ElemAB.insert('afterbegin', '<tb></tb>');
    }, '<r><aa></aa><ta></ta><ab><tb></tb><b></b></ab><ac></ac></r>'));

    describe('when inserting content beforeend', testResult(function () {
      return ElemAB.insert('beforeend', '<tc></tc>');
    }, '<r><aa></aa><ta></ta><ab><tb></tb><b></b><tc></tc></ab><ac></ac></r>'));

    describe('when inserting content afterend', testResult(function () {
      return ElemAB.insert('afterend', '<td></td>');
    }, '<r><aa></aa><ta></ta><ab><tb></tb><b></b><tc></tc></ab><td></td><ac></ac></r>'));

    describe('when appending content', testResult(function () {
      return ElemAB.append('<te></te>');
    }, '<r><aa></aa><ta></ta><ab><tb></tb><b></b><tc></tc><te></te></ab><td></td><ac></ac></r>'));

    describe('when overwriting content', testResult(function () {
      return ElemAB.append('<tf></tf>');
    }, '<r><aa></aa><ta></ta><ab><tb></tb><b></b><tc></tc><te></te><tf></tf></ab><td></td><ac></ac></r>'));

    describe('when overwriting content', testResult(function () {
      return ElemAB.setContent('<tb></tb><tc></tc>');
    }, '<r><aa></aa><ta></ta><ab><tb></tb><tc></tc></ab><td></td><ac></ac></r>'));

    describe('when removeing content', testResult(function () {
      return ElemAB.trim();
    }, '<r><aa></aa><ta></ta><ab></ab><td></td><ac></ac></r>'));

    describe('when removeing element', testResult(function () {
      return ElemAB.remove();
    }, '<r><aa></aa><ta></ta><td></td><ac></ac></r>'));

    describe('when removeing root element', expectError(function () {
      root.remove();
    }));

    done();
  });

  function testResult(fn, content) {
    return function () {
      var node = fn();

      it('the tree should match', function (done) {
        common.createContent(content, function (content) {
          assert.strictEqual(node.document.tree.innerHTML, content.innerHTML);
          done();
        });
      });
    };
  }

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
}));