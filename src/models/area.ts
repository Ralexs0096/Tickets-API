import AuditModel from './auditModel';

class Area extends AuditModel {
  static get tableName() {
    return 'areas';
  }

  declare id: number;
  /** Name of the Area e.g. Corte */
  declare name: string;
}

export default Area;
