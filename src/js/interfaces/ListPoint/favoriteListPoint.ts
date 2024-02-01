import { IListPoint } from "./ListPoint";

export interface IFavoriteListPoint extends Omit<IListPoint, "count"> {}
