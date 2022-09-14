import axios, { AxiosResponse } from 'axios';
import { onResponse, onResponseError } from '@/services/API';

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(onResponse, onResponseError);

export default {
  async login(payload: {email: string | null, password: string | null}): Promise<AxiosResponse<{'two_factor': boolean}>> {
    await authClient.get('/sanctum/csrf-cookie');
    return authClient.post('/login', payload);
  },
  logout(): Promise<AxiosResponse<null>> {
    return authClient.post('/logout');
  },
  async forgotPassword(payload: {email: string | null}): Promise<AxiosResponse<{'message': string}>> {
    await authClient.get('/sanctum/csrf-cookie');
    return authClient.post('/forgot-password', payload);
  },
  async getAuthUser(): Promise<AxiosResponse<{'data': {'id': number | null, 'name': string | null, 'email': string | null, 'avatar': string | null, 'isAdmin': boolean, 'email_verified_at': string | null}}>> {
    return authClient.get('/api/users/auth');
  },
  async resetPassword(payload: {email: string | null, password: string | null, password_confirmation: string | null, token: string | null }): Promise<AxiosResponse<{'message': string}>> {
    await authClient.get('/sanctum/csrf-cookie');
    return authClient.post('/reset-password', payload);
  },
  updatePassword(payload: {current_password: string | null, password: string | null, password_confirmation: string | null}): Promise<AxiosResponse<void>> {
    return authClient.put('/user/password', payload);
  },
  async registerUser(payload: {name: string | null, email: string | null, password: string | null, password_confirmation: string | null}): Promise<AxiosResponse<void>> {
    await authClient.get('/sanctum/csrf-cookie');
    return authClient.post('/register', payload);
  },
  sendVerification(payload: {user: number | null}): Promise<AxiosResponse<void>> {
    return authClient.post('/email/verification-notification', payload);
  },
  async updateUser(payload: {name: string | null, email: string | null}): Promise<void> {
    await authClient.put('/user/profile-information', payload);
  }
};
