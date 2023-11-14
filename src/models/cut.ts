import AuditModel from './auditModel';

class Cut extends AuditModel {
  static get tableName() {
    return 'cut';
  }

  declare id: number;
  declare code: number;
}

export default Cut;
