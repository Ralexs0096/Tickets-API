import { Model } from 'objection';
import AuditModel from './auditModel';
import User from './user';
import Role from './role';

class Credential extends AuditModel {
  static get tableName() {
    return 'credentials';
  }

  declare id: number;
  declare userId: number;
  declare email: string;
  declare passwordHash: string;
  declare isActive: boolean;

  user?: User;
  roles?: Role[];

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'credentials.userId',
          to: 'users.id',
        },
      },
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'credentials.id',
          through: {
            from: 'credential_roles.credentialId',
            to: 'credential_roles.roleId',
          },
          to: 'roles.id',
        },
      },
    };
  }
}

export default Credential;
