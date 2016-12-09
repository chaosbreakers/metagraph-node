// @flow
import Promise from 'bluebird';
import path from 'path';
import PouchDB from 'pouchdb-node';

class Backend {
  db: PouchDB;
  dbName: string;

  constructor(gid: string) {
    this.dbName = path.join(Backend.DB_DIR, gid);
    this.db = new PouchDB(this.dbName);
  }

  static DB_DIR = './db/';

  addVertex(vid: string, label: string) {
    return new Promise((resolve, reject) => {
      this.db.put({
        _id: vid,
        label,
        properties: {},
        inE: {},
        outE: {},
      }).then(resolve)
        .catch(reject);
    });
  }

  removeVertex(vid: string) {
    return new Promise((resolve, reject) => {
      this.db.get(vid)
        .then(doc => this.db.remove(doc))
        .then(resolve)
        .catch(reject);
    });
  }
}

export default Backend;
