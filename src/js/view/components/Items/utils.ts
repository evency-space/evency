import { IListPoint, LIST_POINT_CATEGORIES } from "../../../interfaces";
import { getEmptyListPoint } from "../../../utils";

export const getEmptyListPointWithCurrentCategory = (
  category: LIST_POINT_CATEGORIES | undefined
): IListPoint => {
  const emptyListPoint = getEmptyListPoint();

  if (category) {
    return {
      ...emptyListPoint,
      item: {
        ...emptyListPoint.item,
        tags: [category],
      },
    };
  }

  return emptyListPoint;
};
