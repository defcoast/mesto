export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this.element = document.querySelector(containerSelector);
  }

  renderAll () {
    this._items.forEach((item) => this._renderer(item));
  }

  appendItem (card) {
    this.element.append(card);
  }

  prependItem (card) {
    this.element.prepend(card);
  }

}



