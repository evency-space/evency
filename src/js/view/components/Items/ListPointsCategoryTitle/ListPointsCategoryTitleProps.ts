import { LIST_POINT_CATEGORIES } from "../../../../interfaces";

export interface IListPointsCategoryTitleProps {
  categoryTitle: LIST_POINT_CATEGORIES;
  onCreateListPoint?: (category?: LIST_POINT_CATEGORIES) => void;
  disableCategoryAddButton?: boolean;
}
