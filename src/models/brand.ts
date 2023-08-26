import AuditModel from './auditModel';

class Brand extends AuditModel {
  static get tableName() {
    return 'brand';
  }

  static get idColumn(): string {
    return 'id';
  }

  declare name: string;
}

export default Brand;
