import { delSession } from '$lib/db.js';
import { parse, serialize } from 'cookie';

export async function get({ request }) {
  const cookie = request.headers.get('cookie') || '';
  const { session_id } = parse(cookie);

  if (session_id)
    await delSession(session_id);

  return {
    status: 200,
    headers: { 'Set-Cookie': serialize('session_id', '', {
      path: '/',
      sameSite: 'strict',
      expires: new Date(0)
    })}
  };
}
