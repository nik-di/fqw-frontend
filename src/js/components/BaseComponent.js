export default class BaseComponent {
  constructor() { }

  _setEventListeners(listeners) {
    listeners.forEach(
      ([element, eventName, handler, once = false]) => {
        element.addEventListener(eventName, handler, { once });
      }
    );
  }

  _removeEventListeners(listeners) {
    listeners.forEach(
      ([element, eventName, handler, once = false]) => {
        element.removeEventListener(eventName, handler, { once });
      }
    );
  }
}