// @flow
import path from 'path';
import PouchDB from 'pouchdb-node';

const dbDir = './db/';

class Backend {
  constructor(gid) {
    this.db = new PouchDB(path.join(dbDir, gid));
  }

  addVertex(vid, label) {
    this.db.put({
      _id: vid,
      label,
      properties: {},
      inE: {},
      outE: {},
    });
  }

  removeVertex(vid) {
    this.db.get(vid).then(doc => this.db.remove(doc)).then((result) => {
      // handle result
    }).catch((err) => {
      throw new Error(err);
    });
  }
}

export default Backend;
