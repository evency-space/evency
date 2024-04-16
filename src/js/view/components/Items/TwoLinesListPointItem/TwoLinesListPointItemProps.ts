import { IListPoint } from "../../../../interfaces";

export interface IListPointItemProps {
  listPointName: IListPoint["item"]["name"];
  unit: IListPoint["unit"];
  count: IListPoint["count"];
  countItemTaken: number;
  memberCountItemTaken: number;
  isButton?: boolean;
  prependContent?: JSX.Element;
  additionalContent?: JSX.Element;
  className?: string;
  onClickTitle?: () => void;
  onShowListPointSettings?: () => void;
  onBindListPoint: (value: number) => void;
}
