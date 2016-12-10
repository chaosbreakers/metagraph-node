// @flow
import Promise from 'bluebird';
import _ from 'lodash';
import PouchDB from 'pouchdb-node';

import BackendHelper from './BackendHelper';

class Backend {
  db: PouchDB;
  dbName: string;
  dbRemote: PouchDB;
  dbRemoteAuth: Object;
  dbRemoteHost: string;

  constructor(gid: string, dbRemoteHost: string = '', dbRemoteAuth: Object = {}) {
    this.dbName = BackendHelper.makeDBName(gid);
    this.db = new PouchDB(this.dbName);
    if (dbRemoteHost) {
      this.dbRemote = new PouchDB(dbRemoteHost + gid, {
        auth: dbRemoteAuth,
      });
      this.dbRemoteAuth = dbRemoteAuth;
      this.dbRemoteHost = dbRemoteHost;
    }
  }

  async addVertex(vid: string, label: string) {
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

  async removeVertex(vid: string) {
    return new Promise((resolve, reject) => {
      this.db.get(vid)
        .then(doc => this.db.remove(doc))
        .then(resolve)
        .catch(reject);
    });
  }

  async getVertexFile(vid: string) {
    return new Promise((resolve, reject) => {
      this.db.get(vid).then(doc => {
        this.db.getAttachment(vid, _.keys(doc._attachments)[0])
          .then(resolve)
          .catch(reject);
      });
    });
  }

  async saveVertexFile(vid: string, file: Buffer, fileName: string, fileType: string) {
    return new Promise((resolve, reject) => {
      this.db.get(vid).then(doc => {
        const existingFileName = _.keys(doc._attachments)[0];
        if (existingFileName) {
          reject({
            error: {
              error: 'file exists',
              reason: 'one vertex for one file',
            },
          });
        }
        this.db.putAttachment(
          vid,
          fileName,
          doc._rev,
          file,
          fileType,
        ).then(resolve).catch(reject);
      });
    });
  }

  async getVertexProperties(vid: string) {
    return new Promise((resolve, reject) => {
      this.db.get(vid).then(doc => {
        resolve(doc.properties);
      }).catch(reject);
    });
  }

  async setVertexProperties(vid: string, props: Object) {
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

  async syncOnce() {
    return new Promise((resolve, reject) => {
      this.db.replicate.to(this.dbRemote, {
        live: false,
      }).on('complete', resolve)
        .on('error', reject);
    });
  }
}

export default Backend;
