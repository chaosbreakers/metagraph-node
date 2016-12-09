// @flow
// import _ from 'lodash';
import uuid from 'node-uuid';

import * as ElementHelper from '../ElementHelper';
import GraphTraversal from '../process/GraphTraversal';
import Backend from './Backend';
import Vertex from './Vertex';
import Edge from './Edge';

class Graph {
  id: string;
  backend: Backend;
  vertices: Map<string, Vertex>;
  edges: Map<string, Edge>;

  constructor(gid: string) {
    this.id = gid;
    this.backend = new Backend(gid);
    this.vertices = new Map();
    this.edges = new Map();
  }

  static getNextId() {
    return uuid.v4();
  }

  static open(gid: string) {
    return new Graph(gid);
  }

  V() {
    const traversal = new GraphTraversal(this);

    return traversal;
  }

  v(id: string) {
    if (!id) {
      throw new Error('throw Graph.Exceptions.elementNotFound(Vertex.class, null);');
    }

    const vertex = this.vertices.get(id);

    if (!vertex) {
      throw new Error('Graph.Exceptions.elementNotFound(Vertex.class, id);');
    } else {
      return vertex;
    }
  }

  addVertex(label: string): Vertex {
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

}

export default Graph;
