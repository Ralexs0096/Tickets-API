import Session, { SessionData } from '../models/session';

interface SessionStore {
  get: (
    sid: string,
    callback: (err: Error | null, session?: SessionData | null) => void
  ) => void;
  set: (
    sid: string,
    session: SessionData,
    callback: (err?: Error) => void
  ) => void;
  destroy: (sid: string, callback: (err?: Error) => void) => void;
}

export const SessionStore: SessionStore = {
  async get(sid, callback) {
    try {
      const record = await Session.query().findById(sid);
      if (!record) return callback(null, null);

      // delete expired sessions
      if (record.expired && new Date(record.expired) < new Date()) {
        await Session.query().deleteById(sid);
        return callback(null, null);
      }

      callback(null, record.session);
    } catch (err) {
      // ensure err is an instance of Error
      if (err instanceof Error) callback(err);
      else callback(new Error('Unknown error in session get'));
    }
  },

  async set(sid, sessionData, callback) {
    try {
      const expires = sessionData.cookie.expires
        ? new Date(sessionData.cookie.expires)
        : new Date(Date.now() + 1000 * 60 * 60); // 1 hour by default

      const data: Partial<Session> = {
        sid,
        session: sessionData,
        expired: expires,
        CreatedBy: 'system',
        CreatedDate: new Date(),
        ModifiedBy: 'system',
        ModifiedDate: new Date(),
      };

      const existing = await Session.query().findById(sid);
      if (existing) {
        await Session.query().findById(sid).patch({
          session: data.session,
          expired: data.expired,
          ModifiedBy: data.ModifiedBy,
          ModifiedDate: data.ModifiedDate,
        });
      } else {
        await Session.query().insert(data);
      }

      callback();
    } catch (err) {
      if (err instanceof Error) callback(err);
      else callback(new Error('Unknown error in session set'));
    }
  },

  async destroy(sid, callback) {
    try {
      await Session.query().deleteById(sid);
      callback();
    } catch (err) {
      if (err instanceof Error) callback(err);
      else callback(new Error('Unknown error in session destroy'));
    }
  },
};
