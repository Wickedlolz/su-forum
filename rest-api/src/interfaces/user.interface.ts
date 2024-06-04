import { Request } from 'express';

interface User {
  email: string;
  _id: string;
  username: string;
  token: string;
}

export interface IAuthRequest extends Request {
  user?: User;
}
