import { User } from '@/services/UserService';
import { Links } from '@/interfaces/Links';
import { Meta } from '@/interfaces/Meta';

export interface Users {
  data: User[];
  links: Links;
  meta: Meta;
}
