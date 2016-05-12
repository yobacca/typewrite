;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.typewrite = factory();
  }
}(this, function () {
  'use strict';

  /**
   * Start typewrite.
   * @function typewrite
   * @param {string|HTMLElement} element - Must either be a String containing a selector or be a HTMLElement.
   * @public
   */
  var typewrite = function(element) {
    if (!(this instanceof typewrite)) {
      return new typewrite(element);
    }
    this.element = this._getElement(element);
    this.delay = typewrite.defaultDelay;
    this.humanize = typewrite.defaultHumanize;
    this.length = 0;
    this.first = 0;
    this.queue = [];
    this.text = '';
    this.cursor = this._isCursorClassPresent();
  };

  /**
   * Default value for member |delay|, which is used if no value
   * is provided through |setDelay()|.
   * @property {Number} defaultDelay - Must be a positive integer.
   * @private
   */
  typewrite.defaultDelay = 100;

  /**
   * Default value for member |humanize|, which is used if no value
   * is provided through |setDelay()|.
   * @property {Number} defaultHumanize
   * @private
   */
  typewrite.defaultHumanize = true;

  // Method declarations
  /**
   * Return the number of queued callbacks.
   * @return {number} Difference of |queue.length| and |first|.
   * @private
   */
  typewrite.prototype._size = function() {
    return this.queue.length - this.first;
  };
  
  /**
   * Reduce the size of the queue array by removing already dequeued callbacks.
   * @private
   */
  typewrite.prototype._cleanUp = function() {
    this.queue = this.queue.slice(this.first);
    this.first = 0;
  };

  /**
   * Callback being appended to the queue and executed after dequeuing.
   * @callback typewrite~queueCallback
   */

  /**
   * Append a new callback to the queue and return |typewrite| object.
   * @param  {typewrite~queueCallback} f
   * @return {this}
   * @private
   */
  typewrite.prototype._enqueue = function(f) {
    // faster than this.queue.push(f)
    this.queue[this.queue.length] = f;
    if (!this.init) {
      this.init = true;
      this._dequeue();
    }

    return this;
  };
  
  /**
   * Dequeue and execute the first callback of the queue.
   * @private
   */
  typewrite.prototype._dequeue = function() {
    // if there are no items to dequeue, return immediately
    if (this._size() === 0) {
      return;
    }
    // get the first data of the queue
    var f = this.queue[this.first];
    this.first++;
    // remove free space, if needed
    if (this.first * 2 >= this._size()) {
      this._cleanUp();
    }
    // execute dequeued callback
    f.call(this);
  };

  /**
   * Return an element, which may either be identified by selector 
   * or already provided by caller.
   * @param  {string|HTMLElement} el - Must either be a String containing a selector or be a HTMLElement.
   * @return {HTMLElement}
   * @private
   */
  typewrite.prototype._getElement = function(el) {
    if (typeof el === 'undefined') {
      throw new TypeError('typewrite(element): No value for argument |element| provided.');
    }
    if (typeof el !== 'string' && !(el instanceof Node)) {
      throw new TypeError('typewrite(element): The value of argument |element| must be either a selector or a DOM element.');
    }
    if (typeof el === 'string') {
      el = document.querySelector(el);
      if (el === null) {
        throw new Error('typewrite(element): No matching DOM element for the given selector has been found.');
      }
    }

    return el;
  };

  /**
   * Return an Array of selectors found in linked or embedded CSS stylesheets.
   * @return {Array}
   * @private
   */
  typewrite.prototype._getAllSelectors = function() { 
    var ret = [].slice.call(document.styleSheets)
      .reduce(function(prev, sheet) {
        var rules = '';
        // Because otherwise mocha throws "The operation is insecure."
        try {
          rules = styleSheets[i].rules || styleSheets[i].cssRules;
        } catch(e) {}
        return prev.concat(
          [].slice.call(rules).reduce(function(prev, rule) {
            if (typeof rule.selectorText === 'string') {
              return prev.concat([rule.selectorText]);
            }
            return prev;
          }, [])
        );
      }, []);
    return ret;
  };

  /**
   * Return, if |selector| has been defined in linked or embedded CSS stylesheets.
   * @param  {String}
   * @return {Boolean}
   * @private
   */
  typewrite.prototype._selectorExists = function(selector) { 
    var selectors = this._getAllSelectors();
    return selectors.indexOf(selector) > -1;
  };

  /**
   * Return, if the class rule for an animated cursor has been defined. 
   * @return {Boolean}
   * @private
   */
  typewrite.prototype._isCursorClassPresent = function() {
    return this._selectorExists('.typewrite-cursor');
  };

  /**
   * Append Node containing an animated cursor, if needed.
   * @private
   */
  typewrite.prototype._appendCursorNode = function() {
    if (this.cursor) {
      if (!this.cursorNode) {
        this.cursorNode = document.createElement('span');
        this.cursorNode.className = 'typewrite-cursor';
        this.cursorNode.appendChild(document.createTextNode('|'));
      }
      this.element.appendChild(this.cursorNode);
    }
  };

  /**
   * Return safely escaped string. |\n| characters will be replaced by |<br>| elements.
   * @param  {string} unescapedStr
   * @return {string}
   * @private
   */
  typewrite.prototype._escapeHtml = function(unescapedStr) {
    var str = unescapedStr.split('\n');
    var div = document.createElement('div');
    str.forEach(function(s, i) {
      // only append, if s is not empty
      if (s.length > 0) {
        div.appendChild(document.createTextNode(s));
      }
      // append <br> before next substring
      if (i < str.length - 1) {
        div.appendChild(document.createElement('br'));
      }
    });
    return div.innerHTML;
  };

  /**
   * Safely escape character and append it to content of the DOM element.
   * @param  {string} c - A single unescaped character.
   * @return {this}
   * @private
   */
  typewrite.prototype._typeChar = function(c) {
    this.text += this._escapeHtml(c);
    this.element.innerHTML = this.text;
    this._appendCursorNode();

    return this;
  };

  /**
   * Remove last character from content of the DOM element.
   * @return {this}
   * @private
   */
  typewrite.prototype._bkspChar = function() {
    this.text = this.text.slice(0, -1);
    this.element.innerHTML = this.text;
    this._appendCursorNode();

    return this;
  };

  /**
   * Get the delay in milliseconds.
   * If enabled via |setDelay()|, the delay is humanized by 
   * adding a random amount of milliseconds.
   * @return {number}
   * @private
   */
  typewrite.prototype._getDelay = function() {
    return this.humanize 
      ? Math.round(Math.random() * 200) + this.delay
      : this.delay;
  };

  /**
   * Call function |f| and return |typewrite| object. If |time| is provided, 
   * the call is deferred by the product of member |delay| and |time|.
   * Otherwise it´s deferred by |delay|.
   * @param  {typewrite~queueCallback} f
   * @param  {number} [time] - A positive number or 0.
   * @return {this}
   * @private
   */
  typewrite.prototype._defer = function(f, time) {
    var delay = typeof time === 'number'
      ? this._getDelay() * time
      : this._getDelay();
    setTimeout(function() {
      f.call(this);
    }.bind(this), delay);

    return this;
  };

  /**
   * Execute |callback| asynchronously by appending to the queue and 
   * return the |typewrite| object.
   * @param  {typewrite~queueCallback} callback
   * @return {this}
   * @public
   */
  typewrite.prototype.then = function(callback) {
    return this._enqueue(function() {
      callback.call(this);
      this._defer(this._dequeue);
    });
  };

  /**
   * Set delay after each character is typed and return the |typewrite| object.
   * The time lag may be humanized by adding a random amount of milliseconds 
   * on top of |delay|. It´s appended to the queue to ensure that previous 
   * actions will be finished first.
   * @param {number} delay - A positive integer expressing milliseconds.
   * @param {boolean} [humanize=true] - Humanize delay.
   * @public
   */
  typewrite.prototype.setDelay = function(delay, humanize) {
    if (typeof delay === 'undefined') {
      throw new TypeError('setDelay(delay, humanize): No value for argument |delay| provided.');
    }
    if (typeof delay !== 'number' || !parseInt(delay, 10) || delay < 1) {
      throw new TypeError('setDelay(delay, humanize): The value for argument |delay| must be a positive integer.');
    }
    if (typeof humanize !== 'undefined' && typeof humanize !== 'boolean') {
      throw new TypeError('setDelay(delay, humanize): The value for argument |humanize| must be of type boolean.');
    }
    return this.then(function() {
      this.delay = delay;
      this.humanize = typeof humanize === 'undefined' ? typewrite.defaultHumanize : humanize;
    });
  };

  /**
   * Type content of |text| to the content of the DOM element and return |typewrite| object.
   * @param  {string} text
   * @return {this}
   * @public
   */
  typewrite.prototype.type = function(text) {
    if (typeof text === 'undefined') {
      throw new TypeError('type(text): No value for argument |text| provided.');
    }
    if (typeof text !== 'string') {
      throw new TypeError('type(text): The value of argument |text| must be a string.');
    }
    if (text.length === 0) {
      throw new RangeError('type(text): The value of argument |text| must contain at least one character.');
    }
    Array.from(text).forEach(function(c) {
      this.length++;
      this._enqueue(function() {
        this._typeChar(c);
        this._defer(this._dequeue);
      });
    }.bind(this));
    
    return this;
  };

  /**
   * Backspace a number of characters provided by |count|.
   * If |count| is omitted, backspace only the last character.
   * @param  {number} [count=1] - A positive integer
   * @return {this}
   * @public
   */
  typewrite.prototype.backspace = function(count) {
    if (typeof count !== 'undefined' && (typeof count !== 'number' || !parseInt(count, 10) || count < 1)) {
      throw new TypeError('backspace(count): The value of argument |count| must be a positive integer.');
    }
    count = count || 1;
    for (var i = count; i--; ) {
      this.length--;
      this._enqueue(function() {
        this._bkspChar();
        this._defer(this._dequeue);
      });
    }
    
    return this;
  };

  /**
   * Backspace the whole content of the DOM element.
   * @return {this}
   * @public
   */
  typewrite.prototype.clear = function() {
    return this.backspace(this.length);
  };

  /**
   * Pause for an amount of time, which is being calculated by 
   * the time it takes to type a character (set on |setDelay()|) 
   * multiplied by |time|. 
   * @param  {number} time - A positive float or integer.
   * @return {this}
   * @public
   */
  typewrite.prototype.pause = function(time) {
    if (typeof time === 'undefined') {
      throw new TypeError('pause(time): No value for argument |time| provided.');
    }
    if (typeof time !== 'number') {
      throw new TypeError('pause(time): The argument |time| must be a positive float or integer.');
    }
    time = parseFloat(time);
    if (time <= 0) {
      throw new RangeError('pause(time): The argument |time| must be a positive float or integer.');
    }
    return this._enqueue(function() {
      this._defer(this._dequeue, time);
    });
  };

  return typewrite;
}));
