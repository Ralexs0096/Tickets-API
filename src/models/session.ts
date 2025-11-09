import AuditModel from './auditModel';

export interface SessionData {
  cookie: {
    originalMaxAge: number | null;
    expires: Date | null;
    secure?: boolean;
    httpOnly?: boolean;
    path?: string;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
  };
  userId?: number;
  username?: string;
}

export interface SessionRecord {
  sid: string;
  session: SessionData;
  expired: Date;
  CreatedBy?: string;
  CreatedDate?: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
}

class Session extends AuditModel implements SessionRecord {
  sid!: string;
  session!: SessionData;
  expired!: Date;
  CreatedBy?: string;
  CreatedDate?: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;

  static get tableName() {
    return 'sessions';
  }

  static get idColumn() {
    return 'sid';
  }

  $parseDatabaseJson(json: Record<string, unknown>): Record<string, unknown> {
    const parsed = super.$parseDatabaseJson(json);
    const sessionValue = parsed.session;
    if (typeof sessionValue === 'string') {
      try {
        parsed.session = JSON.parse(sessionValue);
      } catch {
        // ignore parse errors
      }
    }
    return parsed;
  }

  $formatDatabaseJson(json: Record<string, unknown>): Record<string, unknown> {
    const formatted = super.$formatDatabaseJson(json);
    const sessionValue = formatted.session;
    if (sessionValue && typeof sessionValue !== 'string') {
      formatted.session = JSON.stringify(sessionValue);
    }
    return formatted;
  }
}

export default Session;
