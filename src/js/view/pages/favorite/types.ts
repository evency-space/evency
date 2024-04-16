import { LIST_POINT_TYPES } from "../../../common/constants";

export type TSelectedFavoritesItems = { [key: string]: number };

export type TSelectedList = Extract<
  keyof typeof LIST_POINT_TYPES,
  "common" | "private"
>;

export type TTargetLists = TSelectedList[];
