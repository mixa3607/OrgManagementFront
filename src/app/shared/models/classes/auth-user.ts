import {IAuthUser} from '../interfaces/i-auth-user';

export class AuthUser implements IAuthUser{
  jwtToken: string;
  password: string;
  refreshToken: string;
  userName: string;
}
