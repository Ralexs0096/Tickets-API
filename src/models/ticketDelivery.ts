import { Model } from 'objection';
import AuditModel from './auditModel';
import Ticket from './ticket';
import Area from './area';
import User from './user';

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

  declare ticket?: Ticket;
  declare area?: Area;
  declare user?: User;

  static get relationMappings() {
    return {
      ticket: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ticket,
        join: {
          from: 'ticket_deliveries.ticket_id',
          to: 'tickets.id',
        },
      },
      area: {
        relation: Model.BelongsToOneRelation,
        modelClass: Area,
        join: {
          from: 'ticket_deliveries.area_id',
          to: 'areas.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'ticket_deliveries.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

export default TicketDelivery;
