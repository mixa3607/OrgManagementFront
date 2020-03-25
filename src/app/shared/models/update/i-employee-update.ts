export interface IEmployeeUpdate {
  name: string;
  department: string;
  workingPosition: string;
  ipv4Address: string;
  domainNameEntry: string;
  phoneNumber: string;
  email: string;
}

export interface IPassportUpdate {
  initials: string;
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

export interface ITaxIdUpdate {
  serialNumber:number;
  scanFileId:number;
}
