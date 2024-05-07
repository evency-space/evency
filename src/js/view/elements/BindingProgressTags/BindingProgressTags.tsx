import React from "react";
import { useTranslation } from "react-i18next";
import { BindingProgressTagsProps } from "./BindingProgressTagsProps";
import { TextBodySmall } from "../typography";
import { TagSmall } from "../tags";
import { classesOf } from "../../../utils";

export const BindingProgressTags = (props: BindingProgressTagsProps) => {
  const { progressCount, totalCount, unit, className } = props;

  const { t } = useTranslation();

  const classes = classesOf(
    "flex items-center gap-x-1 w-max whitespace-nowrap",
    className,
  );

  return (
    <div className={classes}>
      {totalCount > 0 ? (
        <>
          <TagSmall isButton={false} className="text-sw-max">
            {`${progressCount} ${t(`list_point.short_units.${unit}`)}`}
          </TagSmall>

          <TextBodySmall>
            / {totalCount} {t(`list_point.short_units.${unit}`)}
          </TextBodySmall>
        </>
      ) : (
        <TagSmall isButton={false} className="text-sw-max">
          {t(`list_point.short_units.${unit}`)}
        </TagSmall>
      )}
    </div>
  );
};
