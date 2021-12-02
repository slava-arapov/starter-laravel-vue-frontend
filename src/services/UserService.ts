import * as API from '@/services/API';
import { AxiosResponse } from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: null | string;
  isAdmin: boolean;
  email_verified_at: null;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
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
  getUsers(page: number): Promise<AxiosResponse<Users>> {
    return API.apiClient.get(`/users/?page=${page}`);
  },
  paginateUsers(link: string): Promise<AxiosResponse<Users>> {
    return API.apiClient.get(link);
  }
};
