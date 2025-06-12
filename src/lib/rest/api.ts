import { API_BASE_URL } from '$env/static/private';

export async function fetchApi<T>(
  path: string, // relative path, not full URL
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  const url = API_BASE_URL + path;

  try {
    const res = await fetch(url, {
      method: options?.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: options?.body ? JSON.stringify(options.body) : undefined
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return { data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { error: message };
  }
}
