# typewrite.js

> A flexible typewriter simulator written in plain Javascript, well tested using Mocha, Chai, Karma and Istanbul. [Demo](http://www.olaf-ennen.de/typewrite)

## Install

```
npm install typewrite
```

Or download [typewrite.min.js](https://cdn.rawgit.com/yobacca/typewrite/master/js/typewrite.min.js).

After that just add the script to your HTML document and start typewriting...

```
<span id="typewrite"></span>

<script src="js/typewrite.min.js"></script>
<script type="text/javascript">
typewrite('#type')
  .setDelay(100, true)
  .type('lOREM IPSUM ')
  .setDelay(50, false)
  .pause(5)
  .clear()
  .setDelay(50, true)
  .type('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\nSEd ')
  .setDelay(100, true)
  .pause(5)
  .backspace(3)
  .type('ed diam nonumy eirmod tempor invidunt ')
  .pause(10)
  .setDelay(75, true)
  .type('\nut labore et dolore magna aliquyam erat.');
</script>
```

If you want to add an animated blinking cursor, just add the following CSS rules:

```css
.typewrite-cursor{
  font-weight: 400;
  opacity: 1;
  -webkit-animation: blink 0.95s infinite;
  -moz-animation: blink 0.95s infinite;
  -ms-animation: blink 0.95s infinite;
  -o-animation: blink 0.95s infinite;
  animation: blink 0.95s infinite;
}

@-keyframes blink{
  0% { opacity:1; }
  50% { opacity:0; }
  100% { opacity:1; }
}
@-webkit-keyframes blink{
  0% { opacity:1; }
  50% { opacity:0; }
  100% { opacity:1; }
}
@-moz-keyframes blink{
  0% { opacity:1; }
  50% { opacity:0; }
  100% { opacity:1; }
}
@-ms-keyframes blink{
  0% { opacity:1; }
  50% { opacity:0; }
  100% { opacity:1; }
}
@-o-keyframes blink{
  0% { opacity:1; }
  50% { opacity:0; }
  100% { opacity:1; }
}
```

## API

Each of the following methods return a `typewrite` object which allows method chaining.

### typewrite

```javascript
object typewrite(DOMString/DOMElement element)
```

Returns a `typewrite` object which provides the methods listed below. The `element` argument can be either a selector or a DOM element. This argument is needed to identify the destination of the animation. This method is the starting point for a typewriter simulation.

#### Example

```javascript
var tw = typewrite('#type');
```

### type

```javascript
object type(string text)
```

Types the value of `text`.

#### Example

```javascript
typewrite('#type').type('Lorem ipsum');
```

### backspace

```javascript
object backspace([number count])
```

Backspaces a number of characters provided by `count`. If `count` is omitted, only the last character will be backspaced.

#### Example

```javascript
typewrite('#type').type('Lorem ipsum').backspace(3);
```

### clear

```javascript
object clear()
```

Backspaces all characters.

#### Example

```javascript
typewrite('#type').type('Lorem ipsum').clear();
```

### setDelay

```javascript
object setDelay(number delay, [boolean humanize])
```

Sets the number of milliseconds that each character should be delayed by. The `delay` argument accepts any positive decimal number. If the `humanize` argument is set to `true`, the delay is being humanized by adding a random amount of milliseconds. `humanize` defaults to true, if omitted.
Unless this method is being called, the delay defaults to 100 and is being humanized.

#### Example

```javascript
typewrite('#type').setDelay(100).type('Lorem ipsum').setDelay(50, false).clear();
```

### pause

```javascript
object pause(number time)
```

Pauses for an amount of time, which is being calculated by the time it takes to type a character (set on `setDelay()`) multiplied by `time` which accepts a positive decimal number.

#### Example

```javascript
typewrite('#type').setDelay(100).type('Lorem ipsum').setDelay(50, false).clear();
```

### then

```javascript
object then(function callback)
```

Execute |callback| asynchronously by appending to the queue and return the |typewrite| object.

#### Example

```javascript
typewrite('#type').setDelay(100).type('Lorem ipsum').setDelay(50, false).clear();
```

## Development

The following gulp tasks are provided:

```
gulp
```
or
```
gulp compress
```

Compress js/typewrite.js and copy to js/typewrite.min.js.


```
gulp test
```

Execute Mocha/Chai tests once in several browsers using Karma and process code coverage recording using Istanbul.


```
gulp test:chrome
```

Execute Mocha/Chai tests once in Chrome using Karma and process code coverage recording using Istanbul.


```
gulp test:firefox
```

Execute Mocha/Chai tests once in Firefox using Karma and process code coverage recording using Istanbul.


```
gulp test:Safari
```

Execute Mocha/Chai tests once in Safari using Karma and process code coverage recording using Istanbul.


```
gulp test:Opera
```

Execute Mocha/Chai tests once in Opera using Karma and process code coverage recording using Istanbul.


```
gulp test:ie
```

Execute Mocha/Chai tests once in Internet Explorer using Karma and process code coverage recording using Istanbul.


```
gulp tdd
```

Watch changes to js/typewrite.js or test/tests.js, execute Mocha/Chai tests immediately in Chrome using Karma and process code coverage recording using Istanbul.


## License

[MIT](LICENSE.md) © [Olaf Ennen](https://github.com/yobacca)
