import { Model, RelationMapping } from 'objection';
import AuditModel from './auditModel';
import Area from './area';

class User extends AuditModel {
  static get tableName(): string {
    return 'users';
  }

  /** A unique identity for the user */
  static get idColumn(): string {
    return 'id';
  }

  /** Name of the User e.g. Jhon */
  declare name: string;

  /** Last name of the User e.g. Wick*/
  declare last_name: string;

  /** can be fetched using relation "areaModel" */
  declare area_id?: number;
}

export default User;
