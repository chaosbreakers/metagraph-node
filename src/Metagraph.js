// @flow
import uuid from 'node-uuid';

import Graph from './structure/Graph';

class Metagraph {
  graphs: Map;

  constructer() {
    this.graphs = new Map();
  }

  addGraph() {
    const gid = uuid.v4();
    const graph = new Graph();
    this.graphs.set(gid, graph);
  }

  deleteGraph(gid: String) {
    this.graphs.delete(gid);
  }
}

export default Metagraph;
