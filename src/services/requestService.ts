export function getRequest<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => response.json())
    .catch((error: Error) => error);
}

async function getPage(adress: string): Promise<string | Error> {
  const url = adress.indexOf('http') !== -1 ? adress : `https://${adress}`;
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
