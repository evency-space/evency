import { TSelectedFavoritesItems } from "../../types";

export interface IImportedFavoritesListProps {
  selectedListPoints: TSelectedFavoritesItems;
  onChangeSelectedListPoints: (points: TSelectedFavoritesItems) => void;
}
