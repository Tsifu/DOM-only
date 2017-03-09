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
      const eventName = `pom-${event}`;
      if (el[eventName]) {
        el[eventName].forEach(handler => {
          el.removeEventListener(event, handler);
        });
      }
    });
  }
}

module.exports = DOMNodeCollection;
