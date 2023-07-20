import React from "react";
import { useTranslation } from "react-i18next";
import { BindingProgressTagsProps } from "./BindingProgressTagsProps";
import { TextBodySmall } from "../typography";
import { TagSmall } from "../tags";

export const BindingProgressTags = (props: BindingProgressTagsProps) => {
  const { progressCount, totalCount, unit } = props;

  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-x-1 w-max whitespace-nowrap">
      <TagSmall isButton={false} className="text-sw-max">{`${progressCount} ${t(
        `list_point.short_units.${unit}`
      )}`}</TagSmall>

      <TextBodySmall>
        / {totalCount} {t(`list_point.short_units.${unit}`)}
      </TextBodySmall>
    </div>
  );
};
