let token = "";

const fetchToken = () => {
  return window.localStorage.getItem("token");
};

export const setToken = (newToken: string) => {
  token = newToken;
  window.localStorage.setItem("token", newToken);
};

const getToken = () => {
  if (token === undefined || token === null || token.length === 0) {
    token = fetchToken();
  }
  return token;
};

export default getToken;
