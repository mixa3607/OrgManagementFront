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
