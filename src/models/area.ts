import AuditModel from './auditModel';

class Area extends AuditModel {
  static get tableName() {
    return 'areas';
  }

  /** A unique identity for the Area */
  declare areaId: number;
  static get idColumn(): string {
    return 'id';
  }

  /** Name of the Area e.g. Corte */
  declare name: string;
}

export default Area;
