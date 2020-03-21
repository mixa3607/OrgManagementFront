import {Injectable} from '@angular/core';
import {IEmployee} from '../models/interfaces/i-employee';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IFile, IUploadResult} from '../models/interfaces/i-file';
import {Observable} from 'rxjs';
import {HttpHelper} from './http-helper';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  managementApiUrl: string;

  files: IFile[];

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  uploadBin(fileToUpload: File): Observable<IUploadResult> {
    return this.upload(fileToUpload, EFileType.BIN);
  }

  uploadImg(fileToUpload: File): Observable<IUploadResult> {
    return this.upload(fileToUpload, EFileType.IMG);
  }

  uploadCert(fileToUpload: File): Observable<IUploadResult> {
    return this.upload(fileToUpload, EFileType.CERT);
  }

  private upload(fileToUpload: File, type: EFileType ): Observable<IUploadResult>{
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    const apiCall = this.http.put(this.managementApiUrl + '/file/' + type, formData);
    return new Observable<IUploadResult>(subscriber => {
      apiCall.subscribe(
        (value: IUploadResult) => {subscriber.next(value); subscriber.complete()},
        (error: HttpErrorResponse) => subscriber.error(HttpHelper.HandleHttpError(error))
      );
    });
  }
}


enum EFileType{
  BIN = 'bin',
  IMG = 'img',
  CERT = 'cert'
}
