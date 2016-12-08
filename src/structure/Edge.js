// @flow
import * as ElementHelper from '../ElementHelper';
import Element from './Element';
import Graph from './Graph';
import Property from './Property';
import Vertex from './Vertex';

class Edge extends Element {
  id: String;
  label: String;
  graph: Graph;
  properties: Map;
  inV: Map<String, Array<Vertex>>;
  outV: Map<String, Array<Vertex>>;

  constructor(id, label, graph) {
    super(id, label, graph);
    this.inV = new Map();
    this.outV = new Map();
    this.iterators = new Edge.Iterators();
  }

  property(key, value) {
    if (arguments.length === 1) {
      // get Mode
      return super.property(key);
    }
    return this.setProperty(key, value);
  }

  setProperty(key, value) {
    ElementHelper.validateProperty(key, value);

    const prop = new Property(this, key, value);

    this.properties.set(key, [prop]);

    return prop;
  }

  getIterators() {
    return this.iterators;
  }
}

export default Edge;
