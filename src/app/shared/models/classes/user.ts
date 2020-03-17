import {IUser} from '../interfaces/i-user';

export class User implements IUser{
  jwtToken: string;
  password: string;
  refreshToken: string;
  userName: string;
}
