import { Links, Meta, User } from '@/services/UserService';

export interface Users {
  data: User[];
  links: Links;
  meta: Meta;
}
