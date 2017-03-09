const DOMNodeCollection = require('./dom_node_collection.js');

const functionsToRun = [];

window.$l = arg => {
  switch (typeof(arg)) {
    case 'function':
      return runCallback(arg);
    case 'string':
      return nodeFromDom(arg);
    case 'object':
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection(Array.from(arg));
      }
  }
};

$l.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// XHR
$l.extend = function(...objects) {
  return Object.assign({}, ...objects);
};

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

//Run queued functions when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  functionsToRun.forEach(func => func());
});

//helper methods
const runCallback = func => {
  if (document.readyState === 'complete') {
    func();
  } else {
    functionsToRun.push(func);
  }
};

const nodeFromDom = string => {
  const nodes = document.querySelectorAll(string);
  const nodesArray  = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};
