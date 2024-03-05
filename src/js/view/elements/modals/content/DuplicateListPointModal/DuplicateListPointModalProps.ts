import { IAccessIds, IListPoint } from "../../../../../interfaces";
import { IEditListPoint } from "../../../Forms/ListPointEditForm/ListPointEditFormProps";

export interface IDuplicateListPointModalProps {
  accessIds: IAccessIds;
  listPoint: IListPoint;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
  setListPointForEdit: (listPoint: IEditListPoint) => void;
}
