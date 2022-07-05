import { parse } from 'cookie';
import { getSession as getSessionFromApi, getUser, getAccessibleDatasets } from '$lib/db';

const protectedPages = new Set(["upload", "wrangle", "annotate", "explore"]);

export async function handle({ event, resolve }) {
  const url = event.url.pathname;
  if (url.startsWith('/node_modules'))
    return resolve(event);
  
  const { session_id } = parse(event.request.headers.get('cookie') || '');

  if (session_id) {
    const session = await getSessionFromApi(session_id);
    if (session)
      event.locals.user = { username: session.username };
  }

  // Caused strange JSON parse errors, but not from my code. I
  // couldn't figure it out. Still looking for a clean way to protect
  // pages....
  // if (!event.locals.user && protectedPages.has(url.slice(1))) {
  //   console.log(`Guest redirected from ${url}`);
  //   return new Response('Redirect', {status: 303, headers: { Location: '/protected' }});
  // } else {
  //   console.log(event.locals.user);
  //   console.log(url.slice(1));
  // }

  return resolve(event);
}

export async function getSession(event) {
  let user = event?.locals?.user;
  if (!user) return {};

  let username = user.username;
  let datasets = await getAccessibleDatasets(username);
  datasets = datasets.map(({_id, ...r}) => ({_id: _id.toString(), ...r}));
  //console.log(`Session datasets: ${JSON.stringify(datasets, null, 2)}`);
  return { user, datasets };
}

  
