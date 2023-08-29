import AuditModel from './auditModel';

class User extends AuditModel {
  static get tableName(): string {
    return 'users';
  }

  static get idColumn(): string {
    return 'id';
  }

  /** Name of the User e.g. Jhon */
  declare firstName: string;

  /** Last name of the User e.g. Wick*/
  declare lastName: string;

  /** can be fetched using relation "areaModel" */
  declare areaId?: number;
}

export default User;
