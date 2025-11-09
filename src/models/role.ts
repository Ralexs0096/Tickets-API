import { Model } from 'objection';
import AuditModel from './auditModel';
import Credential from './credential';

class Role extends AuditModel {
  static get tableName() {
    return 'roles';
  }
  declare id: number;
  declare name: string;
  declare description?: string;

  credentials?: Credential;

  static get relationMappings() {
    return {
      credentials: {
        relation: Model.ManyToManyRelation,
        modelClass: Credential,
        join: {
          from: 'roles.id',
          through: {
            from: 'credential_roles.roleId',
            to: 'credential_roles.credentialId',
          },
          to: 'credentials.id',
        },
      },
    };
  }
}

export default Role;
