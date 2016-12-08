class Property {
  constructor(element, key, value) {
    this.element = element;
    this.key = key;
    this.value = value;
    this.graph = this.element.graph;
  }

  getElement() {
    return this.element;
  }

  getKey() {
    return this.key;
  }

  getValue() {
    return this.value;
  }

  isPresent() {
    return this.value !== null && this.value !== undefined;
  }
}

export default Property;
