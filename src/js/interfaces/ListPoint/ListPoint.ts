import { LIST_POINT_CATEGORIES, LIST_POINT_UNITS } from "./contants";

export interface IItem {
  name: string;
  tags: [keyof typeof LIST_POINT_CATEGORIES];
  itemUid: string;
}

export interface IListPoint {
  item: IItem;
  unit: keyof typeof LIST_POINT_UNITS;
  count: number;
  pointUid: string;
}

export interface IListPointBinding {
  member: {
    name: string;
    memberUid: string;
    isAuthor: boolean;
  };
  count: number;
}
