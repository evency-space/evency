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
  } = props;

  const isItemTaken = countItemTaken >= count;

  const titleClasses = classesOf(
    "flex items-center gap-x-2 font-semibold text-light-4 leading-snug",
    isItemTaken && "text-dark-2",
    !isItemTaken && "text-light-4",
    !isButton && "cursor-text"
  );

  const mainClasses = classesOf(
    "flex flex-col gap-y-3 zebra-list-item py-3",
    className
  );

  return (
    <div className={mainClasses}>
      <div className="flex gap-x-3">
        {prependContent}

        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex items-start">
            <div
              className="flex gap-x-3 grow"
              role="button"
              tabIndex={0}
              onClick={onClickTitle}
              onKeyDown={(e) => e}
            >
              <TextBodyLarge className={titleClasses}>
                {listPointName}
                {memberCountItemTaken > 0 && <TagMe />}
              </TextBodyLarge>
            </div>

            <BtnIcon
              icon={<KebabIcon size={16} />}
              className="btn-xs"
              onClick={() => {}}
            />
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
                value={countItemTaken}
                size="sm"
                color={isItemTaken ? "gray" : "green"}
                className="w-[180px]"
                onChange={onBindListPoint}
              />
            </div>
          </div>
        </div>
      </div>

      {additionalContent}
    </div>
  );
};
