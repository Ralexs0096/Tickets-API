import AuditModel from './auditModel';

class Style extends AuditModel {
  static get tableName() {
    return 'style';
  }

  static get idColumn(): string {
    return 'id';
  }

  /** it's a code that identifies the brand and customer e.g. F15WR305 */
  declare code: string;

  declare brand?: string;

  /** can be fetched using relation "CustomerModel" */
  declare customer?: string;
}

export default Style;
