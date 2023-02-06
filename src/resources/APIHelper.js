const uri = 'http://localhost:3001';

const makePost = async (endpoint, body) => {
  const header = new Headers();

  header.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',

    headers: header,

    body,

    redirect: 'follow',
  };

  const res = await fetch(`${uri}/${endpoint}`, requestOptions)
    .then((response) => response.text())

    .then((result) => result)

    .catch((error) => console.log('error', error));

  return res;
};

const doGet = (endpoint, params = '') => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${uri}/${endpoint}/${params}`, requestOptions)
    .then((response) => response.json())

    .then((result) => result)

    .catch((error) => console.log('error', error));
};

const returnPost = (endpoint, body) => {
  const header = new Headers();

  header.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',

    headers: header,

    body,

    redirect: 'follow',
  };

  return fetch(`${uri}/${endpoint}`, requestOptions)
    .then((response) => response.json())

    .then((result) => result)

    .catch((error) => console.log('error', error));
};

export default {
  makePost,

  returnPost,

  doGet,
};
