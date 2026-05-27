import React from "react";
import { useTranslation } from "react-i18next";
import { IListPointsCategoryTitleProps } from "./ListPointsCategoryTitleProps";
import { ButtonTransparent, TextBodyStandard } from "../../../elements";

export const ListPointsCategoryTitle = (
  props: IListPointsCategoryTitleProps
) => {
  const {
    categoryTitle,
    onCreateListPoint,
    disableCategoryAddButton = false,
  } = props;

  const { t } = useTranslation();

  const title = t(`list_point.categories.${categoryTitle}`);

  return (
    <div className="flex mb-4 items-center justify-between">
      <TextBodyStandard className="text-dark-2">{title}</TextBodyStandard>

      {!disableCategoryAddButton && (
        <ButtonTransparent
          className="btn-xs"
          onClick={() => onCreateListPoint?.(categoryTitle)}
        >
          {`+ ${t("buttons.add")}`}
        </ButtonTransparent>
      )}
    </div>
  );
};
