import {HttpErrorResponse} from '@angular/common/http';
import {IApiError} from '../models/interfaces/i-api-error';
import {IValidationProblemDetails} from '../models/interfaces/i-validation-problem-details';
import {EApiErrorTypes} from '../models/eapi-error-types.enum';

export class HttpHelper {
  static HandleHttpError(error: HttpErrorResponse, isLogin = false): IApiError<any> {
    if (error.status === 400) {
      const validationResult: IValidationProblemDetails = error.error;
      const validationErrors = Object.values(validationResult.errors);
      return {errorType: EApiErrorTypes.InvalidData, error: validationErrors} as IApiError<string[]>;
    } else if (error.status === 500) {
      return {errorType: EApiErrorTypes.ServerInternalError, error: null} as IApiError<any>;
    } else if (error.status === 403) {
      if (isLogin) {
        return {errorType: EApiErrorTypes.NeedPassChallenge, error: null} as IApiError<any>;
      } else {
        return {errorType: EApiErrorTypes.Forbid, error: null} as IApiError<any>;
      }
    } else {
      return {errorType: EApiErrorTypes.UnknownError, error: error.status} as IApiError<number>;
    }
  }
}
