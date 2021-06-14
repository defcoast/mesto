export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(containerSelector);

    this.renderAll();
  }

  renderAll() {
    this._items.forEach((item) => {
      const htmlElement = this._renderer(item);
      this._element.append(htmlElement);
    });
  }

  addItem(htmlElement) {
    this._element.prepend(htmlElement);
  }
}
