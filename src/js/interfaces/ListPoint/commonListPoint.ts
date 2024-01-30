import { IListPoint, IListPointBinding } from "./ListPoint";

export interface ICommonListPoint extends IListPoint {
  bindings: IListPointBinding[];
}
