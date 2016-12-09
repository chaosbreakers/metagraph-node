import Graph from '../structure/Graph';
import Bytecode from './Bytecode';
import GraphTraversal from './GraphTraversal';

class GraphTraversalSource {
  graph: Graph;
  bytecode: Bytecode;

  constructor(graph) {
    this.graph = graph;
    this.bytecode = new Bytecode();
  }

  getBytecode() {
    return this.bytecode;
  }

  getGraph() {
    return this.graph;
  }

  V() {
    const traversal = new GraphTraversal(this);
    return traversal;
  }
}

export default GraphTraversalSource;
