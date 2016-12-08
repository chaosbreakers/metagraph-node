// @flow
import uuid from 'node-uuid';

import Graph from './structure/Graph';

class Metagraph {
  graphs: Map;

  constructor() {
    this.graphs = new Map();
  }

  static METAGRAPH_ID = 'metagraph';

  getGraphs() {
    return this.graphs;
  }

  addGraph() {
    const gid = uuid.v4();
    const graph = new Graph();
    this.graphs.set(gid, graph);
  }

  deleteGraph(gid: String) {
    this.graphs.remove(gid);
  }
}

export default Metagraph;
