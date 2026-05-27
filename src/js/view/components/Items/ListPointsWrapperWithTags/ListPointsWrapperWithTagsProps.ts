import { LIST_POINT_CATEGORIES } from "../../../../interfaces";

export type TGroupedListPoints = {
  [key in LIST_POINT_CATEGORIES]?: IListPointData[];
};

export interface IListPointData {
  itemTemplate: JSX.Element;
  name: string;
  tag: keyof typeof LIST_POINT_CATEGORIES | string;
  tags: string[];
}

export type TUnknownListPoint = unknown;

export interface IListPointsWrapperWithTagsProps {
  tags: string[];
  getListPointData: (index: number) => IListPointData;
  listPoints: TUnknownListPoint[];
  onCreateListPoint?: (category?: LIST_POINT_CATEGORIES) => void;
  title: string;
}
