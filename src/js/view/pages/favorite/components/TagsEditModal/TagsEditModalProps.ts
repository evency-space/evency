import { IListPoint } from "../../../../../interfaces";

export interface IEditFavoriteListPoint {
  name: IListPoint["item"]["name"];
  tag: IListPoint["item"]["tags"][0];
  unit: IListPoint["unit"];
  itemUid?: IListPoint["item"]["itemUid"];
  pointUid?: IListPoint["pointUid"];
}

export interface ITagsEditModalProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}
