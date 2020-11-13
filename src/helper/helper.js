class Helper {
  createElement(tag, className, idName) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (idName) element.id = idName;
    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
}

export const helper = new Helper();
