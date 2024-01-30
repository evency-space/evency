import { IListPoint } from "./ListPoint";

interface IPrivatePoint extends IListPoint {
  isPrivate: boolean;
}

export interface IPrivateListPoint {
  count: number;
  point: IPrivatePoint;
  pointUid: string;
  memberUid: string;
  isTaken: boolean;
}
