import AuditModel from './auditModel';

class Customer extends AuditModel {
  static get tableName() {
    return 'customer';
  }

  static get idColumn(): string {
    return 'id';
  }

  declare name: string;
}

export default Customer;
