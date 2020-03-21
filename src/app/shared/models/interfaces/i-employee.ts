export interface IEmployee {
  id: number;
  initials: string;
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

export interface IPassport {
  id: number;
  batch:number;
  serialNumber:number;
  issuer:string;
  issuerNum:string;
  issuedAt: string;
  regPlace:string;
  birthPlace:string;
  birthDay:string;
  scanFileId:number;
}

export interface ITaxId {
  id: number;
  serialNumber:number;
  scanFileId:number;
}

