import AuditModel from './auditModel';

class TicketDelivery extends AuditModel {
  static get tableName() {
    return 'ticket_deliveries';
  }

  declare id: number;
  declare ticket_id: number;
  declare area_id: number;
  declare user_id: number;
  declare delivered_at: Date;
  declare notes: string | null;
}

export default TicketDelivery;
