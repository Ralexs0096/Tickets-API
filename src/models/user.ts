import AuditModel from './auditModel';

class User extends AuditModel {
  static get tableName(): string {
    return 'users';
  }

  declare id: number;
  /** Name of the User e.g. John */
  declare firstName: string;

  /** Last name of the User e.g. Wick*/
  declare lastName: string;

  /** can be fetched using relation "areaModel" */
  declare areaId?: number;
}

export default User;
