export enum EApiErrorTypes {
  InvalidData = 400,
  Forbid = 403,
  Unauthorized = 201,
  NotFound = 404,
  NeedPassChallenge,
  NeedChangePassword,
  UnknownError,
  ServerInternalError
}
