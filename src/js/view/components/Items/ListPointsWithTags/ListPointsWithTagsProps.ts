import { LIST_POINT_CATEGORIES } from "../../../../interfaces";

export type TGroupedListPoints = {
  [key in LIST_POINT_CATEGORIES]?: IListPointData[];
} & { [key in string]?: IListPointData[] };

export interface IListPointData {
  itemTemplate: JSX.Element;
  tag: keyof typeof LIST_POINT_CATEGORIES | string;
  name: string;
  tags: string[];
}

export type TUnknownListPoint = unknown;

export interface IListPointsWithTagsProps {
  title: string;
  tags: string[];
  listPoints: TUnknownListPoint[];
  getListPointData: (index: number) => IListPointData;
  onCreateListPoint?: (category?: LIST_POINT_CATEGORIES) => void;
}
