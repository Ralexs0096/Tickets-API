import AuditModel from './auditModel';

class Cut extends AuditModel {
  static get tableName() {
    return 'cut';
  }

  declare cutKey: number;
  static get idColumn() {
    return 'cutKey';
  }

  declare code: number;
}

export default Cut;
