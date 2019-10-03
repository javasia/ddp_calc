import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_PUT = 'update';
const METHOD_DELETE = 'delete';

const fetcher = ((function fetcher() {
  function requestFailed(reason) {
    if (reason.message) {
      toastr.error(
        reason.message,
        reason.response && reason.response.data && reason.response.data.message,
      );
    } else {
      toastr.error('Error', 'An error has occurred');
    }
  }

  function sendRequest(url, requestParams) {
    return new Promise((resolve, reject) => {
      axios(url, requestParams)
        .then(result => resolve(result.data))
        .catch((reason) => {
          requestFailed(reason);
          reject(reason);
        });
    });
  }

  function makeRequest(url, method, body, reqParams) {
    const requestParams = {
      method: method || METHOD_GET,
      data: body,
      params: {
        ...(reqParams || {}),
      },
    };

    if (method === METHOD_POST || method === METHOD_PUT) {
      requestParams.headers = {
        'Content-Type': 'application/json',
      };
    }

    return sendRequest(url, requestParams);
  }

  return {
    get: (url, requestParams) => makeRequest(url, METHOD_GET, null, requestParams),
    post: (url, body, requestParams) => makeRequest(url, METHOD_POST, body, requestParams),
    put: (url, body, requestParams) => makeRequest(url, METHOD_PUT, body, requestParams),
    deleteRequest: (url, requestParams) => makeRequest(url, METHOD_DELETE, null, requestParams),
  };
})());

export default fetcher;
