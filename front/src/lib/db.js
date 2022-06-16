import { v4 as uuid } from 'uuid';

const users = new Map([
  ['rob', { username: 'rob', password: 'bor' }],
  ['aud', { username: 'aud', password: 'dua' }]
]);

let sessions = new Map();

export const getUser = async (username) => Promise.resolve(users.get(username));

export async function makeSession(username) {
  const id = uuid();
  const session = {id, username};
  sessions.set(id, session);
  return Promise.resolve(session);
}

export async function getSession(id) {
  return Promise.resolve(sessions.get(id));
}

export async function delSession(id) {
  if (!sessions.delete(id))
    return Promise.reject(new Error('Session not found'));
  return Promise.resolve();
}


