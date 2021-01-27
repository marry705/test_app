import { SERVER_HOST } from '../constants';

function getRequest() {
  return fetch(SERVER_HOST)
    .then((response) => response.json())
    .catch((error) => error);
}

export default getRequest;
