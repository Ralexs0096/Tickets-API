import { Model } from 'objection';
import AuditModel from './auditModel';
import Style from './style';
import Brand from './brand';
import TicketDelivery from './ticketDelivery';

class Ticket extends AuditModel {
  static get tableName() {
    return 'tickets';
  }

  declare id: number;
  declare cutNumber: number;

  /** can be fetched using relation "styleModel" */
  declare style?: Style;

  /** can be fetched using relation "brandModel" */
  declare brand?: Brand;

  /** can be fetched using relation "deliveries" */
  declare deliveries?: TicketDelivery[];

  static get relationMappings() {
    return {
      style: {
        relation: Model.BelongsToOneRelation,
        modelClass: Style,
        join: {
          from: 'tickets.styleId',
          to: 'styles.id',
        },
      },
      brand: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'tickets.brandId',
          to: 'brands.id',
        },
      },
      deliveries: {
        relation: Model.HasManyRelation,
        modelClass: TicketDelivery,
        join: {
          from: 'tickets.id',
          to: 'ticket_deliveries.ticket_id',
        },
      },
    };
  }
}

export default Ticket;
