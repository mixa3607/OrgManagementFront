import {IValidationProblemDetails} from '../interfaces/i-validation-problem-details';

export class ValidationProblemDetails implements IValidationProblemDetails {
  detail: string;
  errors: { [p: string]: string };
  status: number;
  title: string;
  type: string;

  static getErrorsValues(validationError: IValidationProblemDetails): string[] {
    return [].concat(...Object.values(validationError.errors));
  }

}
