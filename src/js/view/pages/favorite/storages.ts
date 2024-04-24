import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../../../utils/localStorage";
import { TSelectedFavoritesItems } from "./types";

const localStorageSelectedFavoritesItems = "selectedFavoritesItems";

export const getSelectedFavoritesItemsFromLocalStorage = () =>
  getLocalStorage<TSelectedFavoritesItems>(
    localStorageSelectedFavoritesItems,
  ) || {};

export const saveSelectedFavoritesItemsInLocalStorage = (
  list: TSelectedFavoritesItems,
) => {
  setLocalStorage<TSelectedFavoritesItems>(
    localStorageSelectedFavoritesItems,
    list,
  );
};

export const deleteSelectedFavoritesItemsFromLocalStorage = () => {
  deleteLocalStorage(localStorageSelectedFavoritesItems);
};
