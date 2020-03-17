import {IAuthResult} from '../interfaces/i-auth-result';

export class AuthResult implements IAuthResult{
  refreshToken: string;
  token: string;
  userName: string;
}
