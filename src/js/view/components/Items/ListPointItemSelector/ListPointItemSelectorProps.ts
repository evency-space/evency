import { IListPoint } from "../../../../interfaces";

export interface IListPointItemSelectorProps {
  listPointName: IListPoint["item"]["name"];
  value: boolean;
  content?: JSX.Element;
  grayTitle?: boolean;
  onClick: () => void;
}
