import {
  ICommonListPoint,
  IAccessIds,
  IPrivateListPoint,
  IListPoint,
  IFavoriteListPoint,
} from "../../interfaces";
import { LIST_POINT_TYPES } from "../../common/constants";

export type TLocalStorage = { [key: string]: string };
export type TLocalStorageListPoint =
  | IPrivateListPoint
  | ICommonListPoint
  | IFavoriteListPoint
  | IListPoint;
export type TLocalStorageListPointTypes = keyof typeof LIST_POINT_TYPES;

export type TLocalStorageAccessIdsList = {
  [key: string]: IAccessIds;
};
