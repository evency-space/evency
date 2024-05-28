import React from "react";
import { IListPointItemSelectorProps } from "./ListPointItemSelectorProps";
import { Checkbox } from "../../../elements/inputs/Checkbox/Checkbox";
import { ListPointItem } from "../ListPointItem/ListPointItem";

export const ListPointItemSelector = (props: IListPointItemSelectorProps) => {
  const {
    listPointName,
    grayTitle,
    content = <span />,
    value,
    onClick,
  } = props;

  const label = (
    <ListPointItem
      isButton
      listPointName={listPointName}
      grayTitle={grayTitle}
      content={content}
    />
  );

  return (
    <Checkbox
      className="flex-row-reverse justify-between items-center"
      label={label}
      value={value}
      onChange={onClick}
    />
  );
};
