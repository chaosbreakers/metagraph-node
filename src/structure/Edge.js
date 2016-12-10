// @flow
// import * as ElementHelper from '../ElementHelper';
import Element from './Element';
import Graph from './Graph';
// import Property from './Property';
import Vertex from './Vertex';

class Edge extends Element {
  id: string;
  label: string;
  graph: Graph;
  properties: Object;
  inV: Map<string, Array<Vertex>>;
  outV: Map<string, Array<Vertex>>;

  constructor(id: string, label: string, graph: Graph) {
    super(id, label, graph);
    this.inV = new Map();
    this.outV = new Map();
    this.iterators = new Edge.Iterators();
  }
}

export default Edge;
