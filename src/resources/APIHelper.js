const uri = `http://localhost:3001`;

const makePost = async (endpoint, body) => {
  var header = new Headers();

  header.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",

    headers: header,

    body: body,

    redirect: "follow",
  };

  let res = await fetch(`${uri}/${endpoint}`, requestOptions)
    .then((response) => response.text())

    .then((result) => result)

    .catch((error) => console.log("error", error));

  return res;
};

const doGet = (endpoint, params = "") => {
  var requestOptions = {
    method: "GET",
  };

  return fetch(`${uri}/${endpoint}/${params}`, requestOptions)
    .then((response) => response.json())

    .then((result) => result)

    .catch((error) => console.log("error", error));
};

const returnPost = (endpoint, body) => {
  var header = new Headers();

  header.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",

    headers: header,

    body: body,

    redirect: "follow",
  };

  return fetch(`${uri}/${endpoint}`, requestOptions)
    .then((response) => response.json())

    .then((result) => result)

    .catch((error) => console.log("error", error));
};

export default {
  makePost,

  returnPost,

  doGet,
};
