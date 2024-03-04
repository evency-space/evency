import {
  IAccessIds,
  IListPoint,
  IListPointBinding,
} from "../../../../../interfaces";

export interface ICommonItemBindingsDetailsProps {
  bindingsDetails: IListPointBinding[];
  accessIds: IAccessIds;
  count: IListPoint["count"];
  unit: IListPoint["unit"];
  showTotalBindingsProgress?: boolean;
  onHide: () => void;
}
