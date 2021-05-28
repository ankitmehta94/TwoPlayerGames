import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
const BASE_URL = 'http://18.234.68.157/';
const CONSUMER = '/consumer';
const TEST_URL = '/test/token';


const fireRequest = async (method, url, data) => {
  let fullUrl = url;
  if(typeof fullUrl === "string" && fullUrl.indexOf(BASE_URL)){
    if(fullUrl.indexOf(TEST_URL) < 0){
      fullUrl = `${BASE_URL}${fullUrl}`;
    }
  }
  console.log(fullUrl,'<-----------------next')
  let token = '';
  const options = {
    method,
    body: JSON.stringify(data),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (typeof window !== 'undefined') {
    token = localStorage.Token;
    if (token) options.headers.token = token;
  }
  try {
    const response = await fetch(fullUrl, options);
    console.log(response)
    if (!response || !response.ok) {
      return Promise.reject(response);
    }
    return await response.json();
  } catch (err) {
    console.error('Api.js catch error : %s',err);
    return Promise.resolve({statusCode: 500, error: err});
  }
};

export default {
  get(url, query = {}) {
    const qs = (typeof query == 'undefined') ? '' : queryString.stringify(query, { arrayFormat: 'index' });
    const queryParams = Object.keys(qs).length === 0 ? `` : `?${qs}`;
    return fireRequest('GET', `${url}${queryParams}`);
  },
  post(url, data) {
    return fireRequest('POST', url, data);
  },

  put(url, data) {
    return fireRequest('PUT', url, data);
  },

  delete(url) {
    return fireRequest('DELETE', url);
  },
};
