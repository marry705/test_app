function getRequest<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => response.json())
    .catch((error: Error) => error);
}

export default getRequest;
