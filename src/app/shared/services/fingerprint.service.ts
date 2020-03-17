import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5';
import {DeviceDetectorService} from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class FingerprintService {

  constructor(private ddService: DeviceDetectorService) {
  }

  getFingerprint(): string {
    const md5 = new Md5();
    md5.appendStr(this.ddService.browser);
    md5.appendStr(this.ddService.device);
    md5.appendStr(this.ddService.os);
    return md5.end(false) as string;
  }
}
