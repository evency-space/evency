import { LIST_POINT_TYPES } from "../../../../common/constants";
import { IListPoint, LIST_POINT_UNITS } from "../../../../interfaces";

export const LIST_POINT_UNITS_STEP = {
  [LIST_POINT_UNITS.piece]: 1,
  [LIST_POINT_UNITS.package]: 1,
  [LIST_POINT_UNITS.kilogram]: 0.5,
  [LIST_POINT_UNITS.liter]: 0.5,
  [LIST_POINT_UNITS.gram]: 100,
  [LIST_POINT_UNITS.milliliter]: 100,
};

export interface IEditListPoint {
  pointType?: keyof typeof LIST_POINT_TYPES;
  name: IListPoint["item"]["name"];
  tag: IListPoint["item"]["tags"][0];
  unit: IListPoint["unit"];
  count?: IListPoint["count"];
  itemUid?: IListPoint["item"]["itemUid"];
  pointUid?: IListPoint["pointUid"];
  takeIt?: boolean;
}

export interface IListPointEditFormProps {
  listPointData: IEditListPoint;
  isCreationMode: boolean;
  onChange: (listPointInModel: IEditListPoint) => void;
  onFullFill: (filled: boolean) => void;
}
