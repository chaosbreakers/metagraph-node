import GraphTraversal from '../GraphTraversal';
import AbstractStep from '../AbstractStep';
import HasContainer from './util/HasContainer';

class HasStep extends AbstractStep {
  hasContainer: HasContainer;

  constructor(traversal: GraphTraversal, hasContainer: HasContainer) {
    super(traversal);
    this.hasContainer = hasContainer;
  }
}

export default HasStep;
