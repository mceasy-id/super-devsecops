import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const publicPaths = ['/auth', '/logout', '/login'];
  
  if (publicPaths.some((path) => event.url.pathname.startsWith(path))) {
    return resolve(event);
  }

  const token = event.cookies.get('token');
  if (!token) throw redirect(302, '/login');

  const res = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) throw redirect(302, '/login');

  const user = await res.json();
  // @ts-ignore
  event.locals.user = user;

  return resolve(event);
};
