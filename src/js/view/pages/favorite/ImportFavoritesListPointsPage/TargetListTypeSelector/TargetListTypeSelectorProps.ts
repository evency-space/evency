import { TSelectedList } from "../../types";

export interface ITargetListTypeSelectorProps {
  selectedList: TSelectedList;
  selectList: (listType: TSelectedList) => void;
}
