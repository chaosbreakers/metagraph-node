import test from 'ava';
import Graph from '../../src/structure/Graph';
import {
  TEST_GRAPH_ID,
  VERTEX_LABEL_PERSON,
} from '../fixtures/constants';

let graph;

test.before(t => {
  graph = new Graph(TEST_GRAPH_ID);
  t.pass();
});

test('check backend', async (t) => {
  const dbInfo = await graph.backend.db.info();
  t.is(dbInfo.db_name, graph.backend.dbName);
  t.true(dbInfo.doc_count >= 0);
});

test('add vertex', async (t) => {
  const v = await graph.addVertex(VERTEX_LABEL_PERSON);
  t.is(v.label, VERTEX_LABEL_PERSON);

  const props = {
    name: 'zizai',
  };
  await v.setProperties(props);
  const vp = await v.getProperties();
  t.deepEqual(vp, props);
});
