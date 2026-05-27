import { IListPoint } from "../../../../../interfaces";

export interface IEditFavoriteListPoint {
  name: IListPoint["item"]["name"];
  tag: IListPoint["item"]["tags"][0];
  unit: IListPoint["unit"];
  itemUid?: IListPoint["item"]["itemUid"];
  pointUid?: IListPoint["pointUid"];
  userTags?: string[];
}

export interface IFavoriteListPointEditFormProps {
  listPointData: IEditFavoriteListPoint;
  onChange: (listPointInModel: IEditFavoriteListPoint) => void;
  onFullFill: (filled: boolean) => void;
}
