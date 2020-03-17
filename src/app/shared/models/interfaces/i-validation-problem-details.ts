import {IProblemDetails} from './i-problem-details';

export interface IValidationProblemDetails extends IProblemDetails {
  errors: { [property: string]: string }
}
