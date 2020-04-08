import {ITaxId} from './i-tax-id';
import {IPassport} from './i-passport';

export interface IEmployeeDt {
  id: number;
  name: string;
  department: string;
  workingPosition: string;
  ipv4Address: string;
  isOnline: boolean;
  domainNameEntry: string;
  phoneNumber: string;
  email: string;
  passport: IPassport;
  taxId: ITaxId;
}

