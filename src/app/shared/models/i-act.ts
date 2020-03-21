export interface IChangeAction<T>{
  type: EChangeActionType;
  value: T;
}
export enum EChangeActionType{
  ADD,
  DEL
}
