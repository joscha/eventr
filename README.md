# [![Build Status](https://travis-ci.org/joscha/eventr.svg?branch=master)](https://travis-ci.org/joscha/eventr) Eventr - a JavaScript event simulator

[![Greenkeeper badge](https://badges.greenkeeper.io/joscha/eventr.svg)](https://greenkeeper.io/)

Code initially based on [Protolicious](https://github.com/kangax/protolicious/blob/master/event.simulate.js), made library agnostic by a user [on stackoverflow](http://stackoverflow.com/questions/6157929) and was then made into a CoffeeScript module.

## Usage
There is only one public static method:

```
Eventr.simulate(element, eventName [, options]) -> DOMElement
```
where

- `element` is the DOM element to fire the event on
- `eventName` is the name of event to fire. Currently only MouseEvents and HTMLEvents interfaces are supported, which include:
  - `load`, `unload`, `abort`, `error`, `select`, `change`, `submit`, `reset`, `focus`, `blur`, `resize`, `scroll`
  - `click`, `dblclick`, `mousedown`, `mouseup`, `mouseover`, `mousemove`, `mouseout`
- `options` is an optional object to fine-tune event properties like:
  - `pointerX`, `pointerY`, `button`, `ctrlKey`, `altKey`, `shiftKey`, `metaKey`, `bubbles`, `cancelable`, etc.

Returned is the target element for convenient chaining (well at least as easy as it gets with static methods :).

## Building from source
Just run `grunt`.

## Version history
* [2014-11-19] - **0.2.0**: build tools, min version, bower component
* [2013-01-11] - **0.1**: initial version

## License
MIT License, see LICENSE.md
