export interface ICertDt {
    id: number;
    name: string;
    notBefore: string;
    notAfter: string;
    issuer: string;

    certFileId: number;
    containerFileId: number;

    employeeId: number;
}
