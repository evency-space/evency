import React from "react";
import { useTranslation } from "react-i18next";
import { TakenListPointItemProps } from "./TakenListPointItemProps";
import { TagSmall } from "../../../../elements";
import { ListItemSelector } from "../../../ListItemSelector/ListItemSelector";

export const TakenListPointItem = (props: TakenListPointItemProps) => {
  const { listPoint, onCheck } = props;

  const { t } = useTranslation();

  const listPointCount = (
    <TagSmall className="w-max" onClick={onCheck}>{`${
      listPoint.count
    } ${t(`list_point.short_units.${listPoint.point.unit}`)}`}</TagSmall>
  );

  const content = (
    <div className="flex grow items-center justify-between gap-x-4">
      {listPointCount}
    </div>
  );

  return (
    <ListItemSelector
      listItemName={listPoint.point.item.name}
      grayTitle={listPoint.isTaken}
      content={content}
      value={listPoint.isTaken}
      onClick={onCheck}
    />
  );
};
