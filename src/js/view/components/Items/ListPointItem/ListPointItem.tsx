import React from "react";
import { IListPointItemProps } from "./ListPointItemProps";
import { TextBodyLarge } from "../../../elements";
import { classesOf } from "../../../../utils";

export const ListPointItem = (props: IListPointItemProps) => {
  const {
    listPointName,
    content,
    outerContent,
    grayTitle,
    isButton = false,
    onClickTitle,
  } = props;

  const titleClasses = classesOf(
    "font-semibold text-light-4",
    grayTitle && "text-dark-2",
    !grayTitle && "text-light-4",
    !isButton && "cursor-text",
  );

  return (
    <>
      <div className="flex items-center py-4 gap-x-4">
        {listPointName && (
          <div
            role="button"
            tabIndex={0}
            onClick={onClickTitle}
            onKeyDown={(e) => e}
          >
            <TextBodyLarge className={titleClasses}>
              {listPointName}
            </TextBodyLarge>
          </div>
        )}

        {content}
      </div>

      {outerContent}
    </>
  );
};
