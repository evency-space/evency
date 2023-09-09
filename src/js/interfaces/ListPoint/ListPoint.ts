import { LIST_POINT_CATEGORIES, LIST_POINT_UNITS } from "./contants";

// Backend models
export interface IItemFromBE {
  name: string;
  tags: LIST_POINT_CATEGORIES[];
  estimated_price: number;
  weight: number;
  volume: number;
  photo: string;
  is_presaved: boolean;
  item_uid?: string;
}

export interface IListPointFromBE {
  item: IItemFromBE;
  unit: keyof typeof LIST_POINT_UNITS;
  count: number;
  is_private: boolean;
}

export interface IListPointBindingFromBE {
  member: {
    member_uid: string;
    name: string;
    is_author: boolean;
  };
  count: number;
}

// Frontend models
export interface IItem
  extends Omit<
    IItemFromBE,
    "estimated_price" | "weight" | "volume" | "photo" | "is_presaved"
  > {
  itemUid?: string;
}

export interface IListPoint
  extends Omit<IListPointFromBE, "is_private" | "item" | "point_uid"> {
  item: IItem;
  pointUid?: string;
}

export interface IListPointBinding
  extends Omit<IListPointBindingFromBE, "member"> {
  member: {
    memberUid: string;
    name: string;
    isAuthor: boolean;
  };
}
