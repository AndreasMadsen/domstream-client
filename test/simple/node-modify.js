/**
 * Copyright (c) 2012 Andreas Madsen
 * MIT License
 */

describe('testing node modifier', function(){
  var assert = chai.assert;
  var content = '<a><b aa ab=b><br ac ad="d"/><d ae af="f"></d></b><e></e><hr/></a>';

  blow.ready(function (done) {

    common.createContent(content, function (content) {
      var doc = domstream(content);

      // find and check node
      var root = doc.find().only().elem('a').toValue().getParent();
      while (!root.isRoot()) {
        root = root.getParent();
      }
      assert.ok(root.elem === content);

      var elemA = doc.find().only().elem('a').toValue();
      assert.ok(elemA.elem === content.getElementsByTagName('a')[0]);

      var elemB = doc.find().only().elem('b').toValue();
      assert.ok(elemB.elem === content.getElementsByTagName('b')[0]);

      // test attribute modification
      describe('test attribute modification', function () {
        describe('when removeing attribute', testResult(function () {
          var node = elemB.removeAttr('aa');

          describe('getting the attribute', function () {
            var value = node.getAttr('aa');

            it('should return null', function () {
              assert.isNull(value);
            });
          });

          return node;
        }, '<a><b  ab=b><br ac ad="d"/><d ae af="f"></d></b><e></e><hr/></a>'));

        describe('when removeing attribute from root', expectError(function () {
          root.removeAttr('fake');
        }));

        describe('when modifying attribute', testResult(function () {
          var node = elemB.setAttr('ab', 'new');

          describe('getting the attribute', function () {
            var value = node.getAttr('ab');

            it('should return new value', function () {
              assert.equal(value, 'new');
            });
          });

          return node;
        }, '<a><b  ab="new"><br ac ad="d"/><d ae af="f"></d></b><e></e><hr/></a>'));

        describe('when adding attribute', testResult(function () {
          var node = elemB.setAttr('aaa', 'set');

          describe('getting the attribute', function () {
            var value = node.getAttr('aaa');

            it('should return set value', function () {
              assert.equal(value, 'set');
            });
          });

          return node;
        }, '<a><b  ab="new" aaa="set"><br ac ad="d"/><d ae af="f"></d></b><e></e><hr/></a>'));

        describe('when modifying attribute from root', expectError(function () {
          root.setAttr('fake', 'fail');
        }));
      });

      // test content modification
      describe('test content modification', function () {
        describe('when inserting content beforebegin', testResult(function () {
          var node = elemB.insert('beforebegin', 'bb');

          describe('getting parent content', function () {
            var outer = elemA.getContent();

            it('should match expected result', function (done) {
              var content = '<a>bb<b  ab="new" aaa="set"><br ac ad="d"/><d ae af="f"></d></b><e></e><hr/></a>';
              common.createContent(content, function (content) {
                assert.equal(content.getElementsByTagName('a')[0].innerHTML, outer);
                done();
              });
            });
          });

          return node;
        }, '<a>bb<b  ab="new" aaa="set"><br ac ad="d"/><d ae af="f"></d></b><e></e><hr/></a>'));

        describe('when inserting content beforebegin on root', expectError(function () {
          root.insert('beforebegin', 'bb');
        }));

        describe('when inserting content afterbegin', testResult(function () {
          var node = elemB.insert('afterbegin', 'ab');

          describe('getting content', function () {
            var inner = node.getContent();

            it('should match expected result', function (done) {
              var content = '<a>bb<b  ab="new" aaa="set">ab<br ac ad="d"/><d ae af="f"></d></b><e></e><hr/></a>';
              common.createContent(content, function (content) {
                assert.equal(content.getElementsByTagName('b')[0].innerHTML, inner);
                done();
              });
            });
          });

          return node;
        }, '<a>bb<b  ab="new" aaa="set">ab<br ac ad="d"/><d ae af="f"></d></b><e></e><hr/></a>'));

        describe('when inserting content beforeend', testResult(function () {
          var node = elemB.insert('beforeend', 'be');

          describe('getting content', function () {
            var inner = node.getContent();

            it('should match expected result', function (done) {
              var content = '<a>bb<b  ab="new" aaa="set">ab<br ac ad="d"/><d ae af="f"></d>be</b><e></e><hr/></a>';
              common.createContent(content, function (content) {
                console.log(content.getElementsByTagName('b')[0].innerHTML, inner);
                assert.equal(content.getElementsByTagName('b')[0].innerHTML, inner);
                done();
              });
            });
          });

          return node;
        }, '<a>bb<b  ab="new" aaa="set">ab<br ac ad="d"/><d ae af="f"></d>be</b><e></e><hr/></a>'));

        describe('when inserting content afterend', testResult(function () {
          var node = elemB.insert('afterend', 'ae');

          describe('getting parent content', function () {
            var outer = elemA.getContent();

            it('should match expected result', function (done) {
              var content = '<a>bb<b  ab="new" aaa="set">ab<br ac ad="d"/><d ae af="f"></d>be</b>ae<e></e><hr/></a>';
              common.createContent(content, function (content) {
                assert.equal(content.getElementsByTagName('a')[0].innerHTML, outer);
                done();
              });
            });
          });

          return node;
        }, '<a>bb<b  ab="new" aaa="set">ab<br ac ad="d"/><d ae af="f"></d>be</b>ae<e></e><hr/></a>'));

        describe('when inserting content afterend on root', expectError(function () {
          root.insert('afterend', 'ae');
        }));

        describe('when appending content', testResult(function () {
          var node = elemB.append('ap');

          describe('getting content', function () {
            var inner = node.getContent();

            it('should match expected result', function (done) {
              var content = '<a>bb<b  ab="new" aaa="set">ab<br ac ad="d"/><d ae af="f"></d>beap</b>ae<e></e><hr/></a>';
              common.createContent(content, function (content) {
                assert.equal(content.getElementsByTagName('b')[0].innerHTML, inner);
                done();
              });
            });
          });

          return node;
        }, '<a>bb<b  ab="new" aaa="set">ab<br ac ad="d"/><d ae af="f"></d>beap</b>ae<e></e><hr/></a>'));
      });

    done();
    });
  });

  blow.ready(function (done) {
    common.createContent(content, function (content) {
      var overwrite = domstream(content);

      var elemOB = overwrite.find().only().elem('b').toValue();
      assert.ok(elemOB.elem = content.getElementsByTagName('b')[0]);

      describe('when overwriting content', testResult(function () {
        var node = elemOB.setContent('overwrite');

        describe('getting content', function () {
          var inner = node.getContent();

          it('should match expected result', function () {
            assert.equal(inner, 'overwrite');
          });
        });

        return node;
      }, '<a><b aa ab=b>overwrite</b><e></e><hr/></a>'));

      done();
    });
  });

  blow.ready(function (done) {
    common.createContent(content, function (content) {
      var remove = domstream(content);

      var elemRB = remove.find().only().elem('b').toValue();
      assert.ok(elemRB.elem === content.getElementsByTagName('b')[0]);

      describe('when removeing content', testResult(function () {
        var node = elemRB.trim();

        describe('getting content', function () {
          var inner = node.getContent();

          it('should match expected result', function () {
            assert.equal(inner, '');
          });
        });

        return node;
      }, '<a><b aa ab=b></b><e></e><hr/></a>'));

      done();
    });
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
});
