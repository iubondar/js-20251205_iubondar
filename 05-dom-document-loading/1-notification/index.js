export default class NotificationMessage {
  element = null;
  duration = 0;
  #message = "";
  #type = "";

  constructor(message = "", { duration = 1000, type = "success" } = {}) {
    this.#message = message;
    this.duration = duration;
    this.#type = type;

    this._render();
  }

  _render() {
    const tmp = document.createElement("div");
    tmp.innerHTML = this._template();
    this.element = tmp.firstElementChild;
  }

  _template() {
    return `
      <div class="notification ${this.#type}" style="--value:${
      this.duration
    }ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
        <div class="notification-header">${this.#type}</div>
        <div class="notification-body">${this.#message}</div>
      </div>
    </div>`;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  show(targetElement) {
    if (this.element.parentNode) {
      this.element.remove();
    }

    // Если targetElement передан, добавляем уведомление как его дочерний элемент
    if (targetElement) {
      targetElement.append(this.element);
    } else {
      // Если targetElement не передан, позиционируем уведомление под кнопкой
      const referenceElement = document.getElementById("btn1") || document.body;

      // Добавляем уведомление в document.body
      document.body.append(this.element);

      const rect = referenceElement.getBoundingClientRect();
      this.element.style.position = "absolute";
      this.element.style.top = `${rect.bottom + 5}px`;
      this.element.style.left = `${rect.left + 10}px`;
    }

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  destroy() {
    this.remove();
    this.element = null;
    this.duration = null;
    this.#message = null;
    this.#type = null;
  }
}
