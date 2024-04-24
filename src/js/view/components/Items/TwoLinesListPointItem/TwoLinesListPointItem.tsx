import React from "react";
import { IListPointItemProps } from "./TwoLinesListPointItemProps";
import {
  BindingProgressTags,
  BtnIcon,
  Counter,
  TagMe,
  TextBodyLarge,
} from "../../../elements";
import { classesOf } from "../../../../utils";
import { KebabIcon } from "../../../icons";
import { LIST_POINT_UNITS_STEP } from "../../../elements/Forms/ListPointEditForm/ListPointEditFormProps";

export const TwoLinesListPointItem = (props: IListPointItemProps) => {
  const {
    listPointName,
    unit,
    count,
    countItemTaken,
    memberCountItemTaken,
    prependContent,
    additionalContent,
    isButton = false,
    className,
    onClickTitle,
    onBindListPoint,
    onShowListPointSettings,
  } = props;

  const isItemTaken = count > 0 && countItemTaken >= count;

  const titleClasses = classesOf(
    "flex items-center gap-x-2 font-semibold text-light-4 leading-snug",
    isItemTaken && "text-dark-2",
    !isItemTaken && "text-light-4",
    !isButton && "cursor-text"
  );

  const mainClasses = classesOf("flex gap-x-3 py-3", className);

  return (
    <div className={mainClasses}>
      {prependContent}

      <div className="flex flex-col gap-y-3 w-full">
        <div className="flex items-start justify-between">
          <div
            className="flex gap-x-3"
            role="button"
            tabIndex={0}
            onClick={onClickTitle}
            onKeyDown={(e) => e}
          >
            <TextBodyLarge className={titleClasses}>
              {listPointName}
              {count > 0 && memberCountItemTaken > 0 && <TagMe />}
            </TextBodyLarge>
          </div>

          {count > 0 && (
            <BtnIcon
              icon={<KebabIcon size={16} />}
              className="btn-xs"
              onClick={() => onShowListPointSettings?.()}
            />
          )}
        </div>

        <div className="flex gap-x-1">
          <BindingProgressTags
            className="grow"
            progressCount={countItemTaken}
            totalCount={count}
            unit={unit}
          />

          <div className="flex grow-0 shrink">
            <Counter
              value={memberCountItemTaken}
              size="sm"
              color={
                isItemTaken || (count === 0 && memberCountItemTaken === 0)
                  ? "gray"
                  : "green"
              }
              step={LIST_POINT_UNITS_STEP[unit]}
              className="w-[180px]"
              onChange={onBindListPoint}
            />
          </div>
        </div>

        {additionalContent}
      </div>
    </div>
  );
};
