import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ICertUploadResult, IFile, IUploadResult} from '../models/interfaces/i-file';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  managementApiUrl: string;

  files: IFile[];

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  get(id: number): Observable<IFile> {
    return this.http.get<IFile>(this.managementApiUrl + '/file/info/' + id);
  }

  uploadBin(fileToUpload: File): Observable<IUploadResult> {
    return this.upload(fileToUpload, EFileType.BIN);
  }

  uploadImg(fileToUpload: File): Observable<IUploadResult> {
    return this.upload(fileToUpload, EFileType.IMG);
  }

  uploadCert(fileToUpload: File): Observable<ICertUploadResult> {
    return this.upload(fileToUpload, EFileType.CERT) as Observable<ICertUploadResult>;
  }

  private upload(fileToUpload: File, type: EFileType): Observable<IUploadResult> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<IUploadResult>(this.managementApiUrl + '/file/' + type, formData,
      {
        headers: new HttpHeaders({
          'Content-Type-Internal': 's',
        })
      }
    );
  }
}


enum EFileType {
  BIN = 'bin',
  IMG = 'img',
  CERT = 'cert'
}
