export function returnFetchOptions<T extends Record<string, any>>(data: T): RequestInit {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
