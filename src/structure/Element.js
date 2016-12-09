
import Graph from './Graph';
// import GraphHelper from './GraphHelper';

class Element {
  id: string;
  label: string;
  graph: Graph;
  properties: Map;

  constructor(id, label, graph) {
    this.id = id;
    this.label = label;
    this.graph = graph;
    this.properties = new Map();
  }

  Iterators = class {
    constructor() {
      return this.properties.iterator();
    }
  }

  hashCode() {
    return this.id.hashCode(); // todo: native Java, must override
  }

  getId() {
    return this.id;
  }

  property(key) {
    if (!this.properties.has(key)) {
      return null;
    }
    const property = this.properties.get(key)[0];
    return property;
  }
}

export default Element;
