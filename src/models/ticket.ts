import AuditModel from './auditModel';

class Ticket extends AuditModel {
  static get tableName() {
    return 'ticket';
  }

  declare ticketKey: number;
  static get idColumn(): string {
    return 'ticketKey';
  }

  declare cutNumber: number;

  /** can be fetched using relation "styleModel" */
  declare style?: string;

  /** can be fetched using relation "brandModel" */
  declare brand?: string;
}

export default Ticket;
