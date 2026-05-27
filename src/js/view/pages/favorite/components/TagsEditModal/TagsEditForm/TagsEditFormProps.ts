import { IListPoint } from "../../../../../../interfaces";

export interface IEditFavoriteListPoint {
  name: IListPoint["item"]["name"];
  tag: IListPoint["item"]["tags"][0];
  unit: IListPoint["unit"];
  itemUid?: IListPoint["item"]["itemUid"];
  pointUid?: IListPoint["pointUid"];
}

export interface ITagsEditFormProps {
  tags: string[];
  selectedTags: string[];
  updateTagsList: (tags: string[]) => void;
  selectTags: (tags: string[]) => void;
}
