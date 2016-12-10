// @flow
import Promise from 'bluebird';
import path from 'path';
import PouchDB from 'pouchdb-node';

class Backend {
  db: PouchDB;
  dbName: string;
  dbRemote: PouchDB;
  hostName: string;

  constructor(gid: string, hostName: string = '') {
    this.dbName = path.join(Backend.DB_DIR, gid);
    this.db = new PouchDB(this.dbName);
    this.hostName = hostName;
    if (hostName) {
      this.dbRemote = new PouchDB(hostName + gid);
      this.db.replicateTo(this.dbRemote);
    }
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

  getVertexProperties(vid: string) {
    return new Promise((resolve, reject) => {
      this.db.get(vid).then(doc => {
        resolve(doc.properties);
      }).catch(reject);
    });
  }

  setVertexProperties(vid: string, props: Object) {
    return new Promise((resolve, reject) => {
      this.db.get(vid).then(doc => {
        this.db.put({
          _id: vid,
          _rev: doc._rev,
          properties: props,
        }).then(resolve)
          .catch(reject);
      });
    });
  }
}

export default Backend;
