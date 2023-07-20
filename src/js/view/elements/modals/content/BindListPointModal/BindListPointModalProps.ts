import { ICommonListPoint } from "../../../../../interfaces";

export interface IBindListPointModal {
  listPoint: ICommonListPoint;
  countItemTaken: number;
  onClick: (count: number) => void;
}
