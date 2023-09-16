import {
  ICommonListPoint,
  ICommonListPointFromBE,
  IItem,
  IItemFromBE,
  IListPoint,
  IListPointBinding,
  IListPointBindingFromBE,
  IListPointFromBE,
  IPrivateListPointFromBE,
  ITakenListPoint,
  ITakenListPointFromBE,
  LIST_POINT_CATEGORIES,
  LIST_POINT_UNITS,
} from "../../interfaces";

export const getEmptyListPoint = (): IListPoint => ({
  item: {
    name: "",
    tags: [LIST_POINT_CATEGORIES.food],
  },
  count: 1,
  unit: LIST_POINT_UNITS.piece,
});

export const convertIListPointToIListPointFromBE = (
  listPoint: IListPoint
): IListPointFromBE => ({
  is_private: true,
  item: {
    ...listPoint.item,
    item_uid: listPoint.item.itemUid,
    is_presaved: true,
    estimated_price: 0,
    weight: 0,
    volume: 0,
    photo: "",
  },
  unit: listPoint.unit,
  count: listPoint.count,
});

export const convertIItemFromBEToIItem = (item: IItemFromBE): IItem => ({
  ...item,
  itemUid: item.item_uid,
});

export const convertIPrivateListPointFromBEToIListPoint = (
  listPoint: IPrivateListPointFromBE
): IListPoint => ({
  pointUid: listPoint.point_uid,
  item: convertIItemFromBEToIItem(listPoint.point.item),
  unit: listPoint.point.unit,
  count: listPoint.point.count,
});

export const convertIListPointBindingFromBEtoIListPointBinding = (
  binding: IListPointBindingFromBE
): IListPointBinding => ({
  ...binding,
  member: {
    ...binding.member,
    memberUid: binding.member.member_uid,
    isAuthor: binding.member.is_author,
  },
});

export const convertICommonListPointFromBEToIListPoint = (
  listPoint: ICommonListPointFromBE
): ICommonListPoint => ({
  ...listPoint,
  pointUid: listPoint.point_uid,
  item: convertIItemFromBEToIItem(listPoint.item),
  bindings: listPoint.bindings?.map((b) =>
    convertIListPointBindingFromBEtoIListPointBinding(b)
  ),
});

export const convertITakenListPointFromBEToITakenListPoint = (
  listPoint: ITakenListPointFromBE
): ITakenListPoint => ({
  ...listPoint,
  isTaken: listPoint.is_taken,
  pointUid: listPoint.point_uid,
});
