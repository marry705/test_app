export function getRequest<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => {
      if (response.status !== 200) throw new Error('Request failed');
      return response.json();
    })
    .then((response) => response.bpi)
    .catch((error: Error) => error);
}

async function getPage(adress: string): Promise<string | Error> {
  const url = adress.indexOf('http') !== -1 ? adress : `https://${adress}`;
  try {
    const pageText = fetch(`https://api.allorigins.win/get?url=${url}`, {
      method: 'GET',
    }).then((response) => {
      if (response.status !== 200) throw new Error('Request failed');
      return response.text();
    });
    return pageText;
  } catch (e) {
    throw new Error('Request failed');
  }
}

export { getPage };
