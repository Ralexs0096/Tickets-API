import { Model } from 'objection';

class AuditModel extends Model {
  ModifiedBy?: string;
  ModifiedDate?: Date;
  CreatedBy?: string;
  CreatedDate?: Date;
}

export default AuditModel;
