import { Model } from 'objection';
import AuditModel from './auditModel';
import Style from './style';
import Brand from './brand';

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
    };
  }
}

export default Ticket;
