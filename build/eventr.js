
/*
Eventr.simulate(element, eventName[, options]) -> DOMElement

- element: element to fire event on
- eventName: name of event to fire (only MouseEvents and HTMLEvents interfaces are supported)
- options: optional object to fine-tune event properties - pointerX, pointerY, ctrlKey, etc.

Eventr.simulate($('#foo'),'click'); // => fires "click" event on an element with id=foo
 */

(function() {
  var __slice = [].slice;

  (function(root) {
    var Eventr;
    Eventr = (function() {
      function Eventr() {}

      Eventr.extend = function() {
        var dst, k, o, src, v, _i, _len;
        dst = arguments[0], src = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        for (_i = 0, _len = src.length; _i < _len; _i++) {
          o = src[_i];
          for (k in o) {
            v = o[k];
            dst[k] = v;
          }
        }
        return dst;
      };

      Eventr.eventMatchers = {
        HTMLEvents: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/i,
        MouseEvents: /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/i
      };

      Eventr.defaults = {
        pointerX: 0,
        pointerY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true
      };

      Eventr.simulate = function(target, eventName, options) {
        var body, doc, eventDoc, eventType, evt, matcher, name, oEvent, _ref;
        if (options == null) {
          options = {};
        }
        _ref = this.eventMatchers;
        for (name in _ref) {
          matcher = _ref[name];
          if (matcher.test(eventName)) {
            eventType = name;
            break;
          }
        }
        if (!eventType) {
          throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
        }
        eventName = eventName.toLowerCase();
        options = this.extend({}, this.defaults, options);
        if (document.createEvent) {
          evt = document.createEvent(eventType);
          switch (eventType) {
            case 'HTMLEvents':
              evt.initEvent(eventName, options.bubbles, options.cancelable);
              break;
            default:
              evt.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView, options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, target);
              if (navigator.appVersion.indexOf("MSIE 9") !== -1 && evt.pageX === 0 && evt.pageY === 0) {
                eventDoc = evt.relatedTarget.ownerDocument || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;
                Object.defineProperty(evt, "pageX", {
                  get: function() {
                    return evt.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                  }
                });
                Object.defineProperty(evt, "pageY", {
                  get: function() {
                    return evt.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                  }
                });
              }
          }
          target.dispatchEvent(evt);
        } else {
          options.clientX = options.pointerX;
          options.clientY = options.pointerY;
          delete options.pointerX;
          delete options.pointerY;
          evt = document.createEventObject();
          oEvent = this.extend(evt, options);
          target.fireEvent("on" + eventName, oEvent);
        }
        return target;
      };

      return Eventr;

    })();
    root.Eventr = Eventr;
  })(this);

}).call(this);

//# sourceMappingURL=eventr.js.map
