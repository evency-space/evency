import { LIST_POINT_CATEGORIES } from "../../../../interfaces";

export type TGroupedListPoints = {
  [key in LIST_POINT_CATEGORIES]?: IListPointData[];
};

export interface IListPointData {
  itemTemplate: JSX.Element;
  tag: keyof typeof LIST_POINT_CATEGORIES;
  name: string;
}

export type TUnknownListPoint = unknown;

export interface IListPointsWrapperProps {
  customActionPanel?: JSX.Element;
}
