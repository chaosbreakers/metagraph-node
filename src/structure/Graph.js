// @flow
import _ from 'lodash';
import uuid from 'node-uuid';

import * as ElementHelper from '../ElementHelper';
import GraphTraversal from '../process/GraphTraversal';
import Vertex from './Vertex';
import Edge from './Edge';

class Graph {
  vertices: Map<String, Vertex>;
  edges: Map<String, Edge>;

  constructer() {
    this.vertices = new Map();
    this.edges = new Map();
    this.idManager = new Graph.IdManager();
  }

  static open() {
    return new Graph();
  }

  IdManager = class {
    static getNextId() {
      return uuid.v4();
    }
  }

  V() {
    const traversal = new GraphTraversal(this);

    return traversal;
  }

  v(id) {
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

  getIdManager() {
    return this.idManager;
  }

  addVertex(object: Array = [], ...args) {
    const keyValues = args.length ?
      _.chunk([object, ...args], 2) :
      _.toPairs(object);

    // TODO validate input

    // var idValue = ElementHelper.getIdValue(keyValues) || null;
    // var label = ElementHelper.getLabelValue(keyValues) || Vertex.DEFAULT_LABEL;
    let idValue = null;
    const label = 'vertex';

    if (idValue) {
      if (this.vertices.get(idValue)) {
        throw new Error(`Exceptions.vertexWithIdAlreadyExists(${idValue})`);
      }
    } else {
      idValue = this.getIdManager().getNextId(this);
    }

    const vertex = new Vertex(idValue, label, this);
    this.vertices.set(vertex.id, vertex);

    ElementHelper.attachProperties(vertex, keyValues);

    return vertex;
  }

}

export default Graph;
