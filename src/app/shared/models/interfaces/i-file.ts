export interface IFile{
  id: number,
  md5Hash:string;
  createDate: string;
  type: string;
}

export interface ICertUploadResult extends IUploadResult{
  issuer:string;
  notBefore:string;
  notAfter:string;
}

export interface IUploadResult{
  hash: string;
  id: number;
}
