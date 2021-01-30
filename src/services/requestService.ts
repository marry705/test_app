export function getRequest<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => response.json())
    .catch((error: Error) => error);
}

export function getPage(url: string): Promise<Error | Document> {
  return fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response, 'text/html');
      return doc;
    })
    .catch((error: Error) => error);
}
