import test from 'ava';

import Backend from '../../src/structure/Backend';
import Graph from '../../src/structure/Graph';

let backend;
let vid;

const GID = 'test_graph';

test.before(async (t) => {
  backend = await new Backend(GID);
  t.pass();
});

test('add vertex', async (t) => {
  vid = Graph.IdManager.getNextId();
  await backend.addVertex(vid);
  t.pass();
});

test('remove vertex', async (t) => {
  await backend.removeVertex(vid);
  t.pass();
});
