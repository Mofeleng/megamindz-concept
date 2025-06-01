export function returnFetchOptions<T extends object>(data: T): RequestInit {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
