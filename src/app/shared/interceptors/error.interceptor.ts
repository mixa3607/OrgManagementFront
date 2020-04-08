import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {IApiError} from '../models/interfaces/i-api-error';
import {IValidationProblemDetails} from '../models/interfaces/i-validation-problem-details';
import {EApiErrorTypes} from '../models/eapi-error-types.enum';
import {IProblemDetails} from '../models/interfaces/i-problem-details';
import {ApiError} from '../models/classes/api-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {
  }

  static HandleHttpError(error: HttpErrorResponse, isLogin = false): IApiError<any> {
    if (error.status === 400) {
      const validationResult: IValidationProblemDetails = error.error;
      const validationErrors = Object.values(validationResult.errors);
      return new ApiError<string[]>(EApiErrorTypes.InvalidData, validationErrors);
    } else if (error.status === 500) {
      return new ApiError(EApiErrorTypes.ServerInternalError);
    } else if (error.status === 401) {
      return new ApiError(EApiErrorTypes.Unauthorized);
    } else if (error.status === 404) {
      return new ApiError(EApiErrorTypes.NotFound);
    } else if (error.status === 403) {
      if ((error.error as IProblemDetails).status === 1000) {
        return new ApiError(EApiErrorTypes.NeedPassChallenge);
      } else {
        return new ApiError(EApiErrorTypes.UnknownError);
      }
    } else {
      return new ApiError(EApiErrorTypes.UnknownError);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(// tap(x => console.debug(x)),
      catchError((err: HttpErrorResponse) => {
        return throwError(ErrorInterceptor.HandleHttpError(err, false));
      }));
  }
}
