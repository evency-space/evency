import { LIST_POINT_UNITS } from "../../../interfaces";

export interface BindingProgressTagsProps {
  progressCount: number;
  totalCount: number;
  unit: keyof typeof LIST_POINT_UNITS;
}
