import { IListPoint, LIST_POINT_UNITS } from "../../../../interfaces";

export const LIST_POINT_UNITS_STEP = {
  [LIST_POINT_UNITS.piece]: 1,
  [LIST_POINT_UNITS.package]: 1,
  [LIST_POINT_UNITS.kilogram]: 0.5,
  [LIST_POINT_UNITS.liter]: 0.5,
  [LIST_POINT_UNITS.gram]: 100,
  [LIST_POINT_UNITS.milliliter]: 100,
};

export interface IListPointEditFormProps {
  listPoint: IListPoint;
  onChange: (listPointInModel: IListPoint) => void;
  onFullFill: (filled: boolean) => void;
}
