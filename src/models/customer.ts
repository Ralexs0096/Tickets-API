import AuditModel from './auditModel';

class Customer extends AuditModel {
  static get tableName() {
    return 'customer';
  }

  /** A unique identity for the user */
  declare customerKey: number;
  static get idColumn(): string {
    return 'customerKey';
  }

  declare name: string;
}

export default Customer;
