/*
 * This is the initial API interface
 * we set the base URL for the API
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import { store } from '@/store';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + '/api',
  withCredentials: true // required to handle the CSRF token
});

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (
    error.response &&
    [401, 419].includes(error.response.status) &&
    store.getters['auth/authUser'] &&
    !store.getters['auth/guest']
  ) {
    store.dispatch('auth/logout').then();
  }
  return Promise.reject(error);
};

/*
 * Add a response interceptor
 */
apiClient.interceptors.response.use(onResponse, onResponseError);
