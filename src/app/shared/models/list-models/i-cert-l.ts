export interface ICertL {
    id: number;
    name: string;
    notBefore: string;
    notAfter: string;
    issuer: string;

    employeeId: number;
    employeeName: string;
}
