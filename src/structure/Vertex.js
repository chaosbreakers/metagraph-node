// @flow
import * as ElementHelper from '../ElementHelper';
import Direction from './Direction';
import Element from './Element';
import Edge from './Edge';
import Graph from './Graph';
import Backend from './Backend';
import Property from './Property';

class Vertex extends Element {
  id: string;
  label: string;
  graph: Graph;
  properties: Object;
  file: File;
  inE: Map<string, Array<Edge>>;
  outE: Map<string, Array<Edge>>;

  constructor(id: string, label: string, graph: Graph) {
    super(id, label, graph);
    this.outE = new Map();
    this.inEdges = new Map();
  }

  /**
   * This method is overloaded in Java and handles both set/get operations.
   * We added getProperty/setProperty methods to the prototype (see below) to
   * handle these operations.
   */
  property(key, value, keyValues) {
    if (arguments.length === 1) { // todo: improve check?
      return this.getProperty(key);
    }
    return this.setProperty(key, value, keyValues);
  }

  // JS specific method for getting a property (see property method above)
  getProperty(key) { // JS specific method
    if (this.properties.has(key)) {
      const list = this.properties.get(key);

      if (list.length > 1) {
        throw new Error('Vertex.Exceptions.multiplePropertiesExistForProvidedKey(key)');
      }
      return list[0];
    }

    // return Property.empty();
    return {}; // temp fix
  }

  // JS specific method for setting a property (see property method above)
  setProperty(key, value, keyValues = []) {
    // ElementHelper.legalPropertyKeyValueArray(keyValues);

    // let Property;
    // var optionalId = ElementHelper.getIdValue(keyValues);
    let optionalId; // temp
    // ElementHelper.validateProperty(key, value);

    const prop = optionalId
      ? new Property(optionalId.get(), this, key, value)
      : new Property(this, key, value);

    const list = this.properties.get(key) || [];
    list.push(Property);

    this.properties.set(key, list);
    // this.graph.vertexIndex.autoUpdate(key, value, null, this); //todo: implemented index

    ElementHelper.attachProperties(prop, keyValues);

    return prop;
  }

  addEdge(label, vertex, keyValues) { // ...keyValues
    const edge = Backend.addEdge(this.graph, this, vertex, label, keyValues);

    return edge;
  }

  remove() {
    const edges = [];
    this.getIterators()
      .edges(Direction.BOTH, Number.MAX_SAFE_INTEGER)
      .forEach(edges.push);
    edges.forEach(Edge.remove);
    this.properties.clear();
    this.graph.vertexIndex.removeElement(this);
    this.graph.vertices.delete(this.id);
  }

  getIterators() {
    return this.iterators;
  }

}

export default Vertex;
