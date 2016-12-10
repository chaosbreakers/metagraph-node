// @flow
// import * as ElementHelper from '../ElementHelper';
// import Direction from './Direction';
import Element from './Element';
import Edge from './Edge';
import Graph from './Graph';

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

  async getProperties() {
    this.properties = await this.graph.backend.getVertexProperties(this.id);
    return this.properties;
  }

  async setProperties(props: Object) {
    await this.graph.backend.setVertexProperties(this.id, props);
    this.properties = props;
  }

}

export default Vertex;
