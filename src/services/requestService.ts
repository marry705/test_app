export function getRequest<T>(url: string): Promise<T> {
  return fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    .then((response) => response.json())
    .catch((error: Error) => error);
}

async function getPage(url: string): Promise<Error | string> {
  try {
    const pageText = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
      method: 'GET',
    }).then((response) => response.text());
    return pageText;
  } catch (e) {
    return e;
  }
}

export { getPage };
