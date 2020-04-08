import {EApiErrorTypes} from '../eapi-error-types.enum';
import {IApiError} from '../interfaces/i-api-error';

export class ApiError<T> implements IApiError<T> {
    constructor(type: EApiErrorTypes, error?: T) {
        this.errorType = type;
        this.error = error;
    }

    errorType: EApiErrorTypes;
    error: T;
}
