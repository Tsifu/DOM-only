/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(string) {
    if (typeof string === 'undefined') {
      return this.htmlElements[0].innerHTML;
    } else {
      this.htmlElements.forEach(el => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.htmlElements.forEach(el => {
      el.innerHTML = "";
    });
  }

  append(arg) {
    if (this.htmlElements.length === 0 ) return;

    if (typeof arg === 'object' && !(arg instanceof DOMNodeCollection)) {
      arg = new DOMNodeCollection(Array.from(arg));
    }

    if (typeof arg === 'string') {
      this.htmlElements.forEach(el => {
        el.innerHTML += arg;
        });
    } else if (arg instanceof DOMNodeCollection) {
      this.htmlElements.forEach(el => {
        arg.forEach(child => {
          el.appendChild(child.cloneNode(true));
        });
      });
    }
  }

  attr(key, value) {
    if (typeof value === 'undefined') {
      return this.htmlElements[0].getAttribute(key);
    } else {
      this.htmlElements.forEach(el => {
        el.setAttribute(key, value);
      });
    }
  }

  addClass(className) {
    this.htmlElements.forEach(el => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.htmlElements.forEach(el => {
      el.classList.remove(className);
    });
  }


  children() {
    let allChildren = [];
    this.htmlElements.forEach(el => {
      allChildren = allChildren.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(allChildren);
  }

  remove() {
    this.htmlElements.forEach(el => {
      el.remove();
    });
  }

  parent() {
    let allParents = [];
    this.htmlElements.forEach(el => {
      allParents.push(el.parentNode);
    });

    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    let foundElements = [];
    this.htmlElements.forEach(el => {
      const selectedElements = el.querySelectorAll(selector);
      foundElements = foundElements.concat(Array.from(selectedElements));
    });
    return new DOMNodeCollection(foundElements);
  }


  on(event, handler) {
    this.htmlElements.forEach(el => {
      el.addEventListener(event, handler);
      const eventName = `jq-${event}`;
      if (typeof el[eventName] === 'undefined') {
        el[eventName] = [];
      }
      el[eventName].push(handler);
    });
  }

  off(event) {
    this.htmlElements.forEach(el => {
      const eventName = `jq-${event}`;
      if (el[eventName]) {
        el[eventName].forEach(handler => {
          el.removeEventListener(event, handler);
        });
      }
    });
  }
}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

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


/***/ })
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map
