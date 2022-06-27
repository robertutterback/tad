import { v4 as uuid } from 'uuid';

const users = new Map([
  ['rob', { username: 'rob', password: 'bor', accessibleDatasets: ['1655720242463-4ee2caad-0196-4e21-8e18-deac5836a2e9'] }],
  ['aud', { username: 'aud', password: 'dua', accessibleDatasets: [] }]
]);

const datasetInfos = new Map([
  ['1655720242463-4ee2caad-0196-4e21-8e18-deac5836a2e9', {
    id: '1655720242463-4ee2caad-0196-4e21-8e18-deac5836a2e9',
    name: 'BTI sample',
    path: '/home/rob/src/tad/raw/1655720242463-4ee2caad-0196-4e21-8e18-deac5836a2e9',
    owner: 'rob',
    readers: [],
    files: {
      '/tests/Mexico/phase 1/tp1.txt': {
        origPath: '/tests/Mexico/phase 1/tp1.txt',
        dirPath: '/Mexico/phase 1/',
        filename: 'tp1.txt',
        size: '263.58 KB',
        type: 'txt'
      },
      '/tests/Mexico/phase 4/norte phase 4.txt': {
        origPath: '/tests/Mexico/phase 4/norte phase 4.txt',
        dirPath: '/Mexico/phase 4/',
        filename: 'norte phase 4.txt',
        size: '159.96 KB',
        type: 'txt'
      },
      '/tests/another.txt': {
        origPath: '/tests/another.txt',
        dirPath: '/',
        filename: 'another.txt',
        size: '178.00 B',
        type: 'txt'
      },
      '/tests/Mexico/midlevel.txt': {
        origPath: '/tests/Mexico/midlevel.txt',
        dirPath: '/Mexico/',
        filename: 'midlevel.txt',
        size: 'fake size',
        type: 'txt'
      },
      '/tests/US/notreal.xlsx': {
        origPath: '/tests/US/notreal.xlsx',
        dirPath: '/US/',
        filename: 'notreal.xlsx',
        size: 'fake size',
        type: 'xlsx'
      },
      '/tests/US/phase 1/wsj phase 1.txt': {
        origPath: '/tests/US/phase 1/wsj phase 1.txt',
        dirPath: '/US/phase 1/',
        filename: 'wsj phase 1.txt',
        size: '168.77 KB',
        type: 'txt'
      },
      '/tests/US/Phase 4/wsj phase 4.txt': {
        origPath: '/tests/US/Phase 4/wsj phase 4.txt',
        dirPath: '/US/Phase 4/',
        filename: 'wsj phase 4.txt',
        size: '382.20 KB',
        type: 'txt'
      }
    }
  }]
])

let sessions = new Map();

export const getUser = async (username) => Promise.resolve(users.get(username));

export async function makeSession(username) {
  const id = uuid();
  const session = {id, username};
  sessions.set(id, session);
  return Promise.resolve(session);
}

export async function getDatasetInfo(id) {
  return Promise.resolve(datasetInfos.get(id));
}

export async function addDataset(info) {
  return Promise.resolve(datasetInfos.set(info.id, info));
}

export async function getMultiInfo(ids) {
  const objs = ids.map(id => datasetInfos.get(id));
  return Promise.resolve(objs);
}

export async function getSession(id) {
  return Promise.resolve(sessions.get(id));
}

export async function delSession(id) {
  // if (!sessions.delete(id))
  //   return Promise.reject(new Error('Session not found'));
  return Promise.resolve(sessions.delete(id));
}


