#DOM-only

##Overview

[Live site](http://tsi.life/DOM-only/)

![main screen](assets/screen_shot.png)

This project showcases how to implement: AJAX requests, event handling, DOM traversal and manipulation by using the native DOM API and vanilla JavaScript.

## DEMO

Download the original files `lib/dom_node_collection.js` and `lib/main.js` and use `webpack` to compile the files.

## Core Functions

AJAX request: creates an XMLHttpRequest object, send XHR request and handles callback.

```javascript
$l.ajax = function(options) {
  const defaults = {
    success: () => {},
    error: console.log(),
    url: window.location.href,
    method: 'GET',
    data: '',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);

  xhr.onload = function() {
    if (xhr.status === 200) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error(JSON.parse(xhr.response));
    }
  };

  xhr.send();
};
```

EventHandling

**`.on(eventName, callback)` -** places an event handler function for one or more events to the selected elements.

**`.off(eventName)` -** Remove an event handler.

DOM traversal and manipulation

**`append(content)`-** adds content to the end of the DOMNodeCollection's elements array.

**`addClass(className)`-** adds className to the DOM elements' class properties.

**`attr(attribute, value)`-** returns the value of the attribute if value is not provided. Otherwise, sets the value of the attribute to value.

**`children()`-** returns all of the nested DOM elements as a DOMNodeCollection.

**`parent()`-** returns the parent DOM element as a DOMNodeCollection.

**`remove()`-** removes the DOM element from the page.

**`removeClass(className)`-** removes className from the DOM elements' class properties.

**`find(selector)`-** returns nested DOM elements that meet the selector criteria.

**`find(selector)`-** returns the DOM elements of the children of the element

**`html(textContent)`-** returns HTML content inside the element if textContent is not provided. Sets the HTML conent otherwise.
