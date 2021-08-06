import SessionFileStore from 'session-file-store';
import session from 'express-session';
import path from 'path';

const Store = SessionFileStore(session);
const SessionStore = new Store({ path: path.join(__dirname, '../', 'sessions') });

export default SessionStore;
