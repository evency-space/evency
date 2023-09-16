import { IAccessIds, IListPoint } from "../../../../../interfaces";

export interface IDuplicateListPointModalProps {
  accessIds: IAccessIds;
  listPoint: IListPoint;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: (listPoint: IListPoint) => void;
}
