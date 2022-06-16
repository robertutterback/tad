import { getUser, makeSession } from '$lib/db';
import { serialize } from 'cookie';

const cookieOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: false, // TODO
  maxAge: 60 * 60 * 24 * 7, // one week
};
  

export async function post({ request }) {
  const { username, password } = await request.json();
  const user = await getUser(username);

  if (!(user?.password === password))
    return { status: 401, body: { message: 'Invalid credentials' }};


  const { id } = await makeSession(username);
  const headers = { 'Set-Cookie': serialize('session_id', id, cookieOptions) };
  return { status: 200, headers, body: {message: 'Succesfully signed in'} };
}
