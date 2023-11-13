import AuditModel from './auditModel';

class Ticket extends AuditModel {
  static get tableName() {
    return 'ticket';
  }

  declare id: number;
  declare cutNumber: number;

  /** can be fetched using relation "styleModel" */
  declare style?: string;

  /** can be fetched using relation "brandModel" */
  declare brand?: string;
}

export default Ticket;
