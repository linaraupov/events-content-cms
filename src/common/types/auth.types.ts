import { Request } from 'express';
import { User } from 'src/users/entities';

export interface AuthorizedRequest extends Request<any, any, any> {
  user: User;
}

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
};
