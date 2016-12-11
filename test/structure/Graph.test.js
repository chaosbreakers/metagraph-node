import test from 'ava';
import Graph from '../../src/structure/Graph';
import {
  TEST_GRAPH_ID,
  VERTEX_LABEL_PERSON,
} from '../fixtures/constants';

let graph;

test.before(t => {
  graph = new Graph(
    TEST_GRAPH_ID,
    /*
    'http://localhost:5984/',
    { username: 'mgd', password: 'mgd' },
    */
  );
  t.pass();
});

test('Backend', async (t) => {
  const dbInfo = await graph.backend.db.info();
  t.is(dbInfo.db_name, graph.backend.dbName);
  t.true(dbInfo.doc_count >= 0);

  /* TODO integration test
  await graph.syncOnce();
  t.pass();
  */
});

test('Vertex', async (t) => {
  const v = await graph.addVertex(VERTEX_LABEL_PERSON);
  t.is(v.label, VERTEX_LABEL_PERSON);

  const props = {
    name: 'zizai',
  };
  await v.setProperties(props);
  const vp = await v.getProperties();
  t.deepEqual(vp, props);

  const question = 'blue pill or red pill?';
  const file = Buffer.from(question);
  const fileName = 'question.txt';
  const fileType = 'text/plain';
  await v.saveFile(file, fileName, fileType);
  const vf = await v.getFile();
  t.is(vf.toString(), question);
});
