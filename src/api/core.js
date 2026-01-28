/**
 * Here we define basic post and get methods that implement
 * React 18 data fetching <Supsense> compatible calls
 * we also have a function that retrieves the JWT Bearer token
 * that can be put directly into an authorization header
 */
import axios from "axios";
import config from "./config";
import state from "../state";
/**
 * Wraps a promise so it can be used with React Suspense
 * @param {Promise} promise The promise to process
 * @returns {Object} A response object compatible with Suspense
 */
function SuspensePromise(promise) {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const handler = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response,
  };

  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default();
    return result;
  };

  return { read };
}

export function get(url) {
  const promise = axios.get(config.apiUrl + url).then(({ data }) => data);
  return SuspensePromise(promise);
}

export function post(url, data) {
  const promise = axios
    .post(config.apiUrl + url, data)
    .then(({ data }) => data);
  return SuspensePromise(promise);
}

export function put(url, data) {
  const promise = axios.put(config.apiUrl + url, data).then(({ data }) => data);
  return SuspensePromise(promise);
}

export function patch(url, data) {
  const promise = axios
    .patch(config.apiUrl + url, data)
    .then(({ data }) => data);
  return SuspensePromise(promise);
}

export function jwtHeader() {
  return `bearer ${state.auth.token}`;
}
