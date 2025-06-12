import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function GET({ url, cookies }: { url: URL; cookies: any }) {

  const code = url.searchParams.get('code');
  if (!code) throw redirect(302, '/');

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await res.json();
  if (!data.access_token) throw redirect(302, '/');

  cookies.set('token', data.access_token, {
    path: '/',
    httpOnly: true,
    secure: false, // Set to true in production
    maxAge: 60 * 60 * 24 * 1 // 1 days
  });

  throw redirect(302, '/');
}
