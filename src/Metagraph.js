// @flow
import uuid from 'uuid';

import Graph from './structure/Graph';

class Metagraph {
  hostName: string;
  metagraph: Graph;
  graphs: Map<string, Graph>;

  constructor(hostName: string = '') {
    this.hostName = hostName;
    this.metagraph = new Graph(Metagraph.METAGRAPH_ID, hostName);
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
