import React from "react";
import { IListItemSelectorProps } from "./ListItemSelectorProps";
import { Checkbox } from "../../elements/inputs/Checkbox/Checkbox";
import { ListPointItem } from "../Items/ListPointItem/ListPointItem";
import { Radio } from "../../elements";
import { classesOf } from "../../../utils";

export const ListItemSelector = (props: IListItemSelectorProps) => {
  const {
    listItemName,
    grayTitle,
    content = <span />,
    value,
    variant = "checkbox",
    className,
    onClick,
  } = props;

  const rootClasses = classesOf(
    "flex-row-reverse justify-between items-center",
    className
  );

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
      className={rootClasses}
      label={label}
      value={value}
      onChange={onClick}
    />
  ) : (
    <Radio
      labelClassName={rootClasses}
      label={label}
      value={value}
      onChange={onClick}
    />
  );
};
