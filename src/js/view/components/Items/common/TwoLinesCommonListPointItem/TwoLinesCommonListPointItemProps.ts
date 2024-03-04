import { IAccessIds, ICommonListPoint } from "../../../../../interfaces";

export interface ITwoLinesCommonListPointItem {
  listPoint: ICommonListPoint;
  accessIds: IAccessIds;
  updateListPoint: (listPoint: ICommonListPoint) => void;
  onShowListPointSettings: () => void;
}
