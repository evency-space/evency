import { IListPoint, IListPointFromBE } from "./ListPoint";

// Backend models
export interface ITakenListPointFromBE {
  is_taken: boolean;
  count: number;
  point: IListPointFromBE;
  point_uid: string;
  // TEMPORARY
  isTaken?: boolean;
  pointUid?: string;
}

// Frontend models
export interface ITakenListPoint
  extends Omit<ITakenListPointFromBE, "is_taken" | "point_uid" | "point"> {
  point: IListPoint;
  isTaken: boolean;
  pointUid: string;
}
