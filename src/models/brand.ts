import AuditModel from './auditModel';

class Brand extends AuditModel {
  static get tableName() {
    return 'brands';
  }

  declare id: number;
  declare name: string;
}

export default Brand;
