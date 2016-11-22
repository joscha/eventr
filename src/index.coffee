# Adapted from http://stackoverflow.com/questions/6157929
# Based on https://github.com/kangax/protolicious/blob/master/event.simulate.js

###
Eventr.simulate(element, eventName[, options]) -> DOMElement

- element: element to fire event on
- eventName: name of event to fire (only MouseEvents and HTMLEvents interfaces are supported)
- options: optional object to fine-tune event properties - pointerX, pointerY, ctrlKey, etc.

Eventr.simulate($('#foo'),'click'); // => fires "click" event on an element with id=foo
###
((root) ->
  class Eventr

    @extend: (dst, src...) ->
      dst[k] = v for k,v of o for o in src
      dst

    @eventMatchers:
      HTMLEvents:    /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/i
      MouseEvents:  /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/i

    @defaults:
      pointerX:   0
      pointerY:   0
      button:   0
      ctrlKey:   false
      altKey:   false
      shiftKey:   false
      metaKey:   false
      bubbles:   true
      cancelable: true

    @simulate: (target, eventName, options = {}) ->
      for name,matcher of @eventMatchers
        if matcher.test eventName
          eventType = name
          break

      throw new SyntaxError 'Only HTMLEvents and MouseEvents interfaces are supported' unless eventType
      eventName = eventName.toLowerCase()
      options = @extend {}, @defaults, options

      if document.createEvent
        evt = document.createEvent eventType
        switch eventType
          when 'HTMLEvents'
            evt.initEvent eventName, options.bubbles, options.cancelable
          else
            evt.initMouseEvent eventName, options.bubbles, options.cancelable, document.defaultView, options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, target
            # IE9 creates events with pageX and pageY set to 0.
            # Trying to modify the properties throws an error, so we define getters to return the correct values.
            # Code ported from jquery-ui
            if navigator.appVersion.indexOf("MSIE 9") != -1 and evt.pageX == 0 and evt.pageY == 0
              eventDoc = evt.relatedTarget.ownerDocument || document
              doc = eventDoc.documentElement
              body = eventDoc.body
              Object.defineProperty( evt, "pageX", {
                get: () ->
                  return evt.clientX +
                      ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
                      ( doc && doc.clientLeft || body && body.clientLeft || 0 );
              });

              Object.defineProperty( evt, "pageY", {
                get: () ->
                  return evt.clientY +
                      ( doc && doc.scrollTop || body && body.scrollTop || 0 ) -
                      ( doc && doc.clientTop || body && body.clientTop || 0 );
              });

        target.dispatchEvent evt
      else
        options.clientX = options.pointerX
        options.clientY = options.pointerY
        delete options.pointerX
        delete options.pointerY
        evt = document.createEventObject()
        oEvent = @extend evt, options
        target.fireEvent "on#{eventName}", oEvent

      target
  root.Eventr = Eventr
  return
) @
