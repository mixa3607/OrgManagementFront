import {EApiErrorTypes} from '../eapi-error-types.enum';

export interface IApiError<T> {
  errorType: EApiErrorTypes;
  error: T;
}
