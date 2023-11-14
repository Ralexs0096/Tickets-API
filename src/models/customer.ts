import AuditModel from './auditModel';

class Customer extends AuditModel {
  static get tableName() {
    return 'customer';
  }

  declare id: number;
  declare name: string;
}

export default Customer;
