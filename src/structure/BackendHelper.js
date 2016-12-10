
export default class BackendHelper {
  static DB_DIR = './db/';

  static makeDBName(gid: string): string {
    return this.DB_DIR + gid;
  }
}
