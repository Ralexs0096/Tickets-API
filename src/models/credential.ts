import { Model } from 'objection';
import AuditModel from './auditModel';
import User from './user';
import Role from './role';
import bcrypt from 'bcrypt';

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

  /**
   * Hashes and sets the password on the model.
   * Automatically generates a salt.
   */
  async setPassword(plainPassword: string): Promise<void> {
    const saltRounds = 12;
    this.passwordHash = await bcrypt.hash(plainPassword, saltRounds);
  }

  /**
   * Verifies a plain password against the stored hash.
   * Returns true if valid.
   */
  async verifyPassword(plainPassword: string): Promise<boolean> {
    if (!this.passwordHash) {
      throw new Error('No password hash set on this credential');
    }
    return bcrypt.compare(plainPassword, this.passwordHash);
  }
}

export default Credential;
