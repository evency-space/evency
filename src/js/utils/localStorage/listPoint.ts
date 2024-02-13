import { TCommonListPointViewMode, TLocalStorageListPointTypes } from "./types";
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "./localStorage";
import {
  localStorageCommonListPointViewMode,
  localStorageCurrentListPointObject,
  localStorageFavoritesIds,
  localStorageListPointType,
} from "./constants";
import { IEditListPoint } from "../../view/elements/Forms/ListPointEditForm/ListPointEditFormProps";

export const saveCurrentListPointInLocalStorage = (
  listPoint: IEditListPoint,
) => {
  setLocalStorage<IEditListPoint>(
    localStorageCurrentListPointObject,
    listPoint,
  );
};

export const getCurrentListPointFromLocalStorage = (): IEditListPoint | null =>
  getLocalStorage<IEditListPoint>(localStorageCurrentListPointObject);

export const deleteCurrentListPointFromLocalStorage = () =>
  deleteLocalStorage(localStorageCurrentListPointObject);

export const saveListPointTypeInLocalStorage = (
  type: TLocalStorageListPointTypes,
) => {
  setLocalStorage<TLocalStorageListPointTypes>(localStorageListPointType, type);
};

export const getListPointTypeFromLocalStorage = () =>
  getLocalStorage<TLocalStorageListPointTypes>(localStorageListPointType);

export const getFavoritesIdsFromLocalStorage = () =>
  getLocalStorage<string[]>(localStorageFavoritesIds) || [];

export const saveFavoritesListPointsUidsInLocalStorage = (list: string[]) => {
  setLocalStorage<string[]>(localStorageFavoritesIds, list);
};

export const pushFavoriteListPointUidInLocalStorage = (favoriteId: string) => {
  const list = new Set([...getFavoritesIdsFromLocalStorage(), favoriteId]);

  setLocalStorage<string[]>(localStorageFavoritesIds, Array.from(list));
};

export const switchCommonListPointViewMode = (
  mode: TCommonListPointViewMode,
) => {
  setLocalStorage<TCommonListPointViewMode>(
    localStorageCommonListPointViewMode,
    mode,
  );
};

export const getCommonListPointViewMode = () =>
  getLocalStorage<TCommonListPointViewMode>(
    localStorageCommonListPointViewMode,
  );
