import { Model, RelationMapping } from 'objection';
import AuditModel from './auditModel';
import Area from './area';

class User extends AuditModel {
  static get tableName(): string {
    return 'users';
  }

  /** A unique identity for the user */
  declare userKey: number;
  static get idColumn(): string {
    return 'userKey';
  }

  /** Name of the User e.g. Jhon */
  declare name: string;

  /** Last name of the User e.g. Wick*/
  declare lastName: string;

  /** can be fetched using relation "areaModel" */
  declare areaKey?: number;
}

export default User;
