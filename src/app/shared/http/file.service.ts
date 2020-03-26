import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ICertUploadResult, IFile, IUploadResult} from '../models/interfaces/i-file';
import {Observable, throwError} from 'rxjs';
import {HttpHelper} from './http-helper';
import {catchError} from 'rxjs/operators';

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
    return this.http.get<IFile>(this.managementApiUrl + '/file/info/' + id).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      })
    );
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
    const apiCall = this.http.put(this.managementApiUrl + '/file/' + type, formData);
    return new Observable<IUploadResult>(subscriber => {
      apiCall.subscribe(
        (value: IUploadResult) => {
          subscriber.next(value);
          subscriber.complete();
        },
        (error: HttpErrorResponse) => subscriber.error(HttpHelper.HandleHttpError(error))
      );
    });
  }
}


enum EFileType {
  BIN = 'bin',
  IMG = 'img',
  CERT = 'cert'
}
