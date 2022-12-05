import * as API from '@/services/API';
import { AxiosResponse } from 'axios';
import { Meta } from '@/interfaces/Meta';
import { Links } from '@/interfaces/Links';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: null | string;
  isAdmin: boolean;
  email_verified_at: null;
}

export interface Users {
  data: User[];
  links: Links;
  meta: Meta;
}

export default {
  getUser(userId: number): Promise<AxiosResponse<User>> {
    return API.apiClient.get(`/users/${userId}`);
  },
  createUser(payload: {name: string | null, email: string | null, password: string | null, isAdmin: boolean}): Promise<AxiosResponse<User>> {
    return API.apiClient.post('/users/', payload);
  },
  updateUser(payload: {id: number, name: string, email: string, password?: string, isAdmin: boolean}): Promise<AxiosResponse<User>> {
    return API.apiClient.put(`/users/${payload.id}`, payload);
  },
  deleteUser(userId: number): Promise<AxiosResponse<User>> {
    return API.apiClient.delete(`/users/${userId}`);
  },
  getUsers(page: number): Promise<AxiosResponse<Users>> {
    return API.apiClient.get(`/users/?page=${page}`);
  },
  paginateUsers(link: string): Promise<AxiosResponse<Users>> {
    return API.apiClient.get(link);
  }
};
