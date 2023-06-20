import AuditModel from './auditModel';

class Brand extends AuditModel {
  static get tableName() {
    return 'brand';
  }

  /** A unique identity for the user */
  declare brandKey: number;
  static get idColumn(): string {
    return 'brandKey';
  }

  declare name: string;
}

export default Brand;
