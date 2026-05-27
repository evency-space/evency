import { IEditFavoriteListPoint } from "../FavoriteListPointEditForm/FavoriteListPointEditFormProps";

export interface IFavoriteListPointEditProps {
  listPoint: IEditFavoriteListPoint;
  isCreationMode: boolean;
  onClick: (listPoint: IEditFavoriteListPoint) => void;
}
