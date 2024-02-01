import { IEditListPoint } from "../../../elements/Forms/ListPointEditForm/ListPointEditFormProps";

export interface IListPointEditProps {
  listPoint: IEditListPoint;
  isCreationMode: boolean;
  onClick: (listPoint: IEditListPoint) => void;
}
