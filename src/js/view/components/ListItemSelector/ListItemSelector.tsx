import React from "react";
import { IListItemSelectorProps } from "./ListItemSelectorProps";
import { Checkbox } from "../../elements/inputs/Checkbox/Checkbox";
import { ListPointItem } from "../Items/ListPointItem/ListPointItem";
import { Radio } from "../../elements";

export const ListItemSelector = (props: IListItemSelectorProps) => {
  const {
    listItemName,
    grayTitle,
    content = <span />,
    value,
    variant = "checkbox",
    onClick,
  } = props;

  const label = (
    <ListPointItem
      isButton
      listPointName={listItemName}
      grayTitle={grayTitle}
      content={content}
    />
  );

  return variant === "checkbox" ? (
    <Checkbox
      className="flex-row-reverse justify-between items-center"
      label={label}
      value={value}
      onChange={onClick}
    />
  ) : (
    <Radio
      labelClassName="flex-row-reverse justify-between items-center"
      label={label}
      value={value}
      onChange={onClick}
    />
  );
};
