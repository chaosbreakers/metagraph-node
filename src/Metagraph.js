// @flow
import uuid from 'node-uuid';

import Graph from './structure/Graph';

class Metagraph {
  metagraph: Graph;
  graphs: Map<string, Graph>;

  constructor() {
    this.metagraph = new Graph(Metagraph.METAGRAPH_ID);
    this.graphs = new Map();
  }

  static METAGRAPH_ID = 'metagraph';

  getGraphs() {
    return this.graphs;
  }

  addGraph() {
    const gid = uuid.v4();
    const graph = new Graph(gid);
    this.graphs.set(gid, graph);
  }

  removeGraph(gid: string) {
    this.graphs.delete(gid);
  }
}

export default Metagraph;
