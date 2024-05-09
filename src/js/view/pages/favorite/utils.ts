import { IFavoriteListPoint, LIST_POINT_UNITS } from "../../../interfaces";
import { LIST_POINT_UNITS_STEP } from "../../elements/Forms/ListPointEditForm/ListPointEditFormProps";
import { TSelectedFavoritesItems } from "./types";

export const getIncrementedCount = ({
  count = 0,
  unit,
}: {
  count?: number;
  unit: keyof typeof LIST_POINT_UNITS;
}) => count + LIST_POINT_UNITS_STEP[unit];

export const getUpdatedSelectedListPoints = ({
  listPoints,
  selectedListPoints,
  key,
  count = 0,
}: {
  listPoints: IFavoriteListPoint[];
  selectedListPoints: TSelectedFavoritesItems;
  key?: string;
  count: number;
}) => {
  let points = { ...selectedListPoints };

  if (!key) {
    const selected = Object.values(selectedListPoints);

    if (selected.length === listPoints.length) {
      points = {};
    } else {
      listPoints.forEach(({ item, unit }) => {
        points[item.itemUid] =
          selectedListPoints[item.itemUid] || getIncrementedCount({ unit });
      });
    }
  } else if (count === 0) {
    delete points[key];
  } else {
    points[key] = count;
  }

  return points;
};

export const getSelectedListPointCount = ({
  count,
  unit,
}: {
  count: number;
  unit: keyof typeof LIST_POINT_UNITS;
}) => (count === 0 ? getIncrementedCount({ count, unit }) : 0);
