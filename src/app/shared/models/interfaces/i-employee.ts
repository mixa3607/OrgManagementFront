export interface IEmployee {
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

  certs: ICert[];
  devices: IDevice[];
}

export interface IPassport {
  id: number;
  initials: string;
  batch: number;
  serialNumber: number;
  issuer: string;
  issuerNum: string;
  issuedAt: string;
  regPlace: string;
  birthPlace: string;
  birthDay: string;
  scanFileId: number;
}

export interface ICert {
  id: number;
  name: string;
  notBefore: string;
  notAfter: string;
  certFileId: number;
  containerFileId: number;
  employee: IEmployee;
}

export interface IDevice {
  id: number;
  name: string;
  invNumber: string;
  typeId: number;
  actions: IDeviceAction[];
  softwares: ISoftware[];
  employee: IEmployee;
}

export interface ISoftware {
  id: number;
  name: string;
  code: string;
  type: string;
}

export interface IDeviceAction {
  id: number;
  receiptDate: string;
  returnDate: string;
  type: string;
}

export interface ITaxId {
  id: number;
  serialNumber: number;
  scanFileId: number;
}

