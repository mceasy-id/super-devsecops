import { fetchApi } from '$lib/rest/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: dashboard } = await fetchApi(`/devsecops/dashboard`);
  return {
    dashboard
  };
};