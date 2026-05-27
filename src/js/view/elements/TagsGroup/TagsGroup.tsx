import React from "react";
import { useTranslation } from "react-i18next";
import { ITagsGroupProps } from "./TagsGroupProps";
import { classesOf } from "../../../utils";

import { TagSmall, TagMedium, TagLarge } from "../tags";

export const TagsGroup = (props: ITagsGroupProps) => {
  const {
    tags = [],
    activeTags = [],
    size,
    readonly,
    localizationPath,
    onClick,
  } = props;

  const { t } = useTranslation();

  const tagComponentsClasses = classesOf(
    "text-small",
    !readonly && "cursor-pointer"
  );

  const TagComponents = {
    s: TagSmall,
    m: TagMedium,
    l: TagLarge,
  };

  const TagComponent = size ? TagComponents[size] : TagComponents.l;

  const checkActiveTag = (tag: string) =>
    activeTags.findIndex((activeTag) => activeTag === tag) !== -1;

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    tagName: string
  ) => {
    event.preventDefault();

    if (!readonly) {
      onClick(tagName);
    }
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tagName) => (
        <TagComponent
          key={tagName}
          isActive={!readonly && checkActiveTag(tagName)}
          className={tagComponentsClasses}
          onClick={(e) => handleClick(e, tagName)}
        >
          {localizationPath ? t(`${localizationPath}.${tagName}`) : tagName}
        </TagComponent>
      ))}
    </ul>
  );
};
