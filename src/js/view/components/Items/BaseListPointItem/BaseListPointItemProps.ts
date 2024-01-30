import { IListPoint } from "../../../../interfaces";

export interface IBaseListPointItemProps {
  name: IListPoint["item"]["name"];
  unit: IListPoint["unit"];
  count?: IListPoint["count"];
  onEdit: () => void;
  onRemove: () => void;
}
