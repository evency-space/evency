import { IAccessIds, ICommonListPoint } from "../../../../../interfaces";

export interface ICommonListPointItemProps {
  listPoint: ICommonListPoint;
  accessIds: IAccessIds;
  onShowListPointSettings: () => void;
  updateListPoint: () => Promise<void>;
}
