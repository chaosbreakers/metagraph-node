// @flow
// import _ from 'lodash';
import uuid from 'node-uuid';

import * as ElementHelper from '../ElementHelper';
import GraphTraversalSource from '../process/GraphTraversalSource';
import Backend from './Backend';
import Vertex from './Vertex';
import Edge from './Edge';

class Graph {
  id: string;
  backend: Backend;
  vertices: Map<string, Vertex>;
  edges: Map<string, Edge>;

  constructor(gid: string, hostName: string = '') {
    this.id = gid;
    this.backend = new Backend(gid, hostName);
    this.vertices = new Map();
    this.edges = new Map();
  }

  static getNextId() {
    return uuid.v4();
  }

  static open(gid: string) {
    return new Graph(gid);
  }

  async addVertex(label: string) {
    ElementHelper.validateLabel(label);
    const vid = Graph.getNextId();
    return new Promise((resolve, reject) => {
      this.backend.addVertex(vid, label).then(() => {
        const vertex = new Vertex(vid, label, this);
        this.vertices.set(vertex.id, vertex);
        resolve(vertex);
      }).catch(err => {
        reject(err);
      });
    });
  }

  traversal() {
    return new GraphTraversalSource(this);
  }

}

export default Graph;
