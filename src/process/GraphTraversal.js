// @flow
import Graph from '../structure/Graph';
import Bytecode from './Bytecode';
import GraphTraversalSource from './GraphTraversalSource';
import AbstractStep from './AbstractStep';
import HasStep from './step/HasStep';
import HasContainer from './step/util/HasContainer';

class GraphTraversal {
  graph: Graph;
  bytecode: Bytecode;
  steps: Array<AbstractStep>;

  constructor(traversalSource: GraphTraversalSource) {
    this.graph = traversalSource.getGraph();
    this.bytecode = traversalSource.getBytecode();
    this.steps = [];
  }

  addStep(step: AbstractStep) {
    this.steps.push(step);
  }

  hasLabel(label: String) {
    this.addStep(new HasStep(new HasContainer(label)));
  }

}

export default GraphTraversal;
