import { fetchApi } from '$lib/rest/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: digests } = await fetchApi(`/devsecops/repo`);
	return {
		digests
	};
};