import { redirect } from '@sveltejs/kit';

export function GET({ cookies }: { cookies: any }) {
  cookies.delete('token', { path: '/' });
  throw redirect(302, '/login');
}
