import { LIST_POINT_TYPES } from "../../../../common/constants";
import { TTargetLists } from "../types";

export const STEP_QUERY_PARAM = {
  key: "step",
  value: "list",
};

export const TARGET_LISTS_TYPES: TTargetLists = [
  LIST_POINT_TYPES.common,
  LIST_POINT_TYPES.private,
];
