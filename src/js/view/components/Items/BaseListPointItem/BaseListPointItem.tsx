import React from "react";
import { useTranslation } from "react-i18next";
import { IBaseListPointItemProps } from "./BaseListPointItemProps";
import { ListPointItem } from "../ListPointItem/ListPointItem";
import { BtnIcon, TagSmall } from "../../../elements";
import { DeleteIcon, EditIcon } from "../../../icons";

export const BaseListPointItem = (props: IBaseListPointItemProps) => {
  const { name, unit, count, onEdit, onRemove } = props;

  const { t } = useTranslation();

  const listPointCount = () => (
    <TagSmall isButton={false} className="w-max">
      {`${count || ""} ${t(`list_point.short_units.${unit}`)}`}
    </TagSmall>
  );

  const actionButtons = () => (
    <div className="flex gap-x-2">
      <BtnIcon
        icon={<EditIcon size={16} />}
        className="btn-sm"
        onClick={onEdit}
      />
      <BtnIcon
        icon={<DeleteIcon size={16} />}
        className="btn-sm"
        onClick={onRemove}
      />
    </div>
  );

  const content = () => (
    <div className="flex grow items-center justify-between gap-x-4">
      {listPointCount()}
      {actionButtons()}
    </div>
  );

  return <ListPointItem listPointName={name} content={content()} />;
};
