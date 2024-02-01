import { LIST_POINT_TYPES } from "../../common/constants";
import {
  IListPoint,
  LIST_POINT_CATEGORIES,
  LIST_POINT_UNITS,
} from "../../interfaces";
import { IEditListPoint } from "../../view/elements/Forms/ListPointEditForm/ListPointEditFormProps";

import { TLocalStorageListPoint } from "../localStorage";

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

export const convertIEditListPointToIListPoint = (
  listPoint: IEditListPoint,
): IListPoint => {
  const { itemUid, name, unit, tag, count, pointUid } = listPoint;
  return {
    item: {
      itemUid: itemUid || "",
      name,
      tags: [tag],
    },
    unit,
    count: count || 0,
    pointUid: pointUid || "",
  };
};

export const convertListPointToIEditListPoint = ({
  point,
  pointType,
}: {
  point: TLocalStorageListPoint;
  pointType?: keyof typeof LIST_POINT_TYPES;
}): IEditListPoint => {
  let convertedPoint;

  if (pointType === "common" && "bindings" in point) {
    const { item, count, pointUid, unit } = point;
    convertedPoint = {
      pointType,
      name: item.name,
      unit,
      tag: item.tags[0],
      count,
      pointUid,
      itemUid: item.itemUid,
    };
  } else if (pointType === "private" && "point" in point) {
    const {
      point: { item, unit },
      pointUid,
      count,
    } = point;

    return {
      pointType,
      name: item.name,
      unit,
      tag: item.tags[0],
      count,
      pointUid,
      itemUid: item.itemUid,
    };
  } else if (pointType === "favorite" && "item" in point) {
    const {
      item: { itemUid, name, tags },
      unit,
    } = point;

    convertedPoint = {
      pointType,
      name,
      tag: tags[0],
      unit,
      itemUid,
    };
  } else {
    const {
      item: { name, tags },
      unit,
      count,
    } = point as IListPoint;

    convertedPoint = {
      pointType,
      name,
      tag: tags[0],
      unit,
      count,
    };
  }

  return convertedPoint;
};
