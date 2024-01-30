import {
  IListPoint,
  LIST_POINT_CATEGORIES,
  LIST_POINT_UNITS,
} from "../../interfaces";

import {
  TLocalStorageListPointTypes,
  TLocalStorageListPoint,
} from "../localStorage";

export const getEmptyListPoint = (): IListPoint => ({
  item: {
    name: "",
    tags: [LIST_POINT_CATEGORIES.food],
    itemUid: "",
  },
  count: 1,
  unit: LIST_POINT_UNITS.piece,
  pointUid: "",
});

export const convertListPointToBaseListPoint = ({
  listPointType,
  listPoint,
}: {
  listPointType: TLocalStorageListPointTypes;
  listPoint: TLocalStorageListPoint;
}): IListPoint | undefined => {
  if (listPointType === "common" && "item" in listPoint) {
    return {
      ...listPoint,
    };
  }

  if (listPointType === "private" && "point" in listPoint) {
    const { point, count, pointUid } = listPoint;
    return {
      item: point.item,
      unit: point.unit,
      count,
      pointUid,
    };
  }

  return listPoint as IListPoint;
};
