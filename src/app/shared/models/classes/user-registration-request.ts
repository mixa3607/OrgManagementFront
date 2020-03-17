import {IUserRegistrationRequest} from '../interfaces/i-user-registration-request';

export class UserRegistrationRequest implements IUserRegistrationRequest{
  fingerprint: string;
  password: string;
  userName: string;
}
