beforeEach(function () {
  typewrite.defaultDelay = 1;
  typewrite.defaultHumanize = false;
  div = document.createElement('div');
  tw = undefined;
  expect = chai.expect;
});

describe('typewrite - happy paths', function() {
  it('type()', function(done) {
    tw = typewrite(div)
      .type('Hello world!')
      .then(function() {
        expect(tw.element.innerHTML).to.equal('Hello world!');
        done();
      });
  });

  it('type() escaping', function(done) {
    tw = typewrite(div)
      .type('Hello <world> & "the" \'outer space\'!')
      .then(function() {
        expect(tw.element.innerHTML).to.equal('Hello &lt;world&gt; &amp; "the" \'outer space\'!');        
        done();
      });
  });

  it('type() line breaks', function(done) {
    tw = typewrite(div)
      .type('Hello\nworld!')
      .then(function() {
        expect(tw.element.innerHTML).to.equal('Hello<br>world!');
        done();
      });
  });

  it('backspace() 7 characters', function(done) {
    tw = typewrite(div)
      .type('Hello world!')
      .backspace(7)
      .then(function() {
        expect(tw.element.innerHTML).to.equal('Hello');
        done();
      });
  });

  it('backspace() default single character', function(done) {
    tw = typewrite(div)
      .type('Hello world!')
      .backspace()
      .then(function() {
        expect(tw.element.innerHTML).to.equal('Hello world');
        done();
      });
  });

  it('backspace() multiple default', function(done) {
    tw = typewrite(div)
      .type('Hello world!')
      .backspace()
      .backspace()
      .then(function() {
        expect(tw.element.innerHTML).to.equal('Hello worl');
        done();
      });
  });

  it('backspace() last character', function(done) {
    tw = typewrite(div)
      .type('H')
      .backspace()
      .then(function() {
        expect(tw.element.innerHTML).to.equal('');
        done();
      });
  });

  it('backspace() delete empty string throws no errors', function(done) {
    tw = typewrite(div)
      .backspace()
      .then(function() {
        expect(tw.element.innerHTML).to.equal('');
        done();
      });
  });

  it('pause()', function(done) {
    tw = typewrite(div)
      .type('Hello ')
      .pause(2)
      .type('world!')
      .then(function() {
        expect(tw.element.innerHTML).to.equal('Hello world!');
        done();
      });
  });

  it('setDelay()', function(done) {
    tw = typewrite(div)
      .type('Hello ')
      .setDelay(2)
      .then(function() {
        expect(tw.delay).to.equal(2);
        done();
      });
  });

  it('length', function(done) {
    tw = typewrite(div)
      .type('Hello ')
      .type('world!')
      .then(function() {
        expect(tw.length).to.equal(12);
        done();
      });
  });

  it('clear()', function(done) {
    tw = typewrite(div)
      .type('Hello world!')
      .clear()
      .then(function() {
        expect(tw.element.innerHTML).to.equal('');
        done();
      });
  });

  it('clear() and type()', function(done) {
    tw = typewrite(div)
      .type('Hello world!')
      .clear()
      .type('second try')
      .then(function() {
        expect(tw.element.innerHTML).to.equal('second try');
        done();
      });
  });

});

describe('typewrite - exceptions', function() {
  it('typewrite(element) - typeof element === undefined', function() {
    expect(typewrite.bind(typewrite, undefined))
      .to.throw(TypeError, /No value for argument |element| provided./);
  });

  it('typewrite(element) - typeof element === undefined', function() {
    expect(typewrite.bind(typewrite, 123))
      .to.throw(TypeError, /The value of argument |element| must be either a selector or a DOM element./);
  });

  it('typewrite(element) - typeof element === undefined', function() {
    expect(typewrite.bind(typewrite, 'abc'))
      .to.throw(Error, /No matching DOM element for the given selector has been found./);
  });

  it('setDelay(delay) - typeof delay === undefined', function() {
    expect(typewrite(div).setDelay.bind(typewrite, undefined))
      .to.throw(TypeError, /No value for argument |delay| provided./);
  });

  it('setDelay(delay) - typeof delay !== number', function() {
    expect(typewrite(div).setDelay.bind(typewrite, 'abc'))
      .to.throw(TypeError, /The value for argument |delay| must be a positive integer./);
  });

  it('setDelay(delay) - !parseInt(delay, 10)', function() {
    expect(typewrite(div).setDelay.bind(typewrite, ' 0xF'))
      .to.throw(TypeError, /The value for argument |delay| must be a positive integer./);
  });

  it('setDelay(delay) - delay < 1', function() {
    expect(typewrite(div).setDelay.bind(typewrite, -1))
      .to.throw(TypeError, /The value for argument |delay| must be a positive integer./);
  });

  it('setDelay(delay) - typeof humanize === undefined', function() {
    expect(typewrite(div).setDelay.bind(typewrite, 1, 'a'))
      .to.throw(TypeError, /The value for argument |humanize| must be of type boolean./);
  });

  it('type(text) - typeof text === undefined', function() {
    expect(typewrite(div).type.bind(typewrite, undefined))
      .to.throw(TypeError, /No value for argument |text| provided./);
  });

  it('type(text) - typeof text !== string', function() {
    expect(typewrite(div).type.bind(typewrite, 123))
      .to.throw(TypeError, /The value of argument |text| must be a string./);
  });

  it('type(text) - text.length === 0', function() {
    expect(typewrite(div).type.bind(typewrite, ''))
      .to.throw(RangeError, /The value of argument |text| must contain at least one character./);
  });

  it('backspace(count) - typeof count !== number', function() {
    expect(typewrite(div).backspace.bind(typewrite, 'abc'))
      .to.throw(TypeError, /The value of argument |count| must be a positive integer./);
  });

  it('backspace(count) - !parseInt(count, 10)', function() {
    expect(typewrite(div).backspace.bind(typewrite, ' 0xF'))
      .to.throw(TypeError, /The value of argument |count| must be a positive integer./);
  });

  it('backspace(count) - count < 1', function() {
    expect(typewrite(div).backspace.bind(typewrite, -1))
      .to.throw(TypeError, /The value of argument |count| must be a positive integer./);
  });

  it('pause(time) - typeof time === undefined', function() {
    expect(typewrite(div).pause.bind(typewrite, undefined))
      .to.throw(TypeError, /No value for argument |time| provided./);
  });

  it('pause(time) - typeof time !== number', function() {
    expect(typewrite(div).pause.bind(typewrite, 'abc'))
      .to.throw(TypeError, /The argument |time| must be a positive float or integer./);
  });

  it('pause(time) - time <= 0', function() {
    expect(typewrite(div).pause.bind(typewrite, -1))
      .to.throw(RangeError, /The argument |time| must be a positive float or integer./);
  });

});