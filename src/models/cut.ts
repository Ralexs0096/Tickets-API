import AuditModel from './auditModel';

class Cut extends AuditModel {
  static get tableName() {
    return 'cut';
  }

  static get idColumn(): string {
    return 'id';
  }

  declare code: number;
}

export default Cut;
