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
  localStorageFavoritesListUid,
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

/**
 * @deprecated
 */
export const getFavoritesIdsFromLocalStorage = () =>
  getLocalStorage<string[]>(localStorageFavoritesIds) || [];

export const getFavoritesListUidFromLocalStorage = () =>
  getLocalStorage<string>(localStorageFavoritesListUid);

export const saveFavoritesListUidInLocalStorage = (listUid: string) => {
  setLocalStorage<string>(localStorageFavoritesListUid, listUid);
};

export const deleteFavoritesIdsFromLocalStorage = () =>
  deleteLocalStorage(localStorageFavoritesIds);

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
