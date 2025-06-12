import { redirect } from '@sveltejs/kit';
import { GITHUB_CLIENT_ID } from '$env/static/private';

export function GET() {
  const githubAuthURL = new URL('https://github.com/login/oauth/authorize');
  githubAuthURL.searchParams.set('client_id', GITHUB_CLIENT_ID);
  githubAuthURL.searchParams.set('scope', 'read:user');

  throw redirect(302, githubAuthURL.toString());
}
