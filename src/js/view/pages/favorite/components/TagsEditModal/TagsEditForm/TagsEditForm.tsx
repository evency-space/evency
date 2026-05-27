import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITagsEditFormProps } from "./TagsEditFormProps";
import {
  ActionPanel,
  ButtonCircle,
  Checkbox,
  Input,
  TextBodyStandard,
} from "../../../../../elements";
import { ListItemSelector, ListPointsWrapper } from "../../../../../components";
import { DoneIcon } from "../../../../../icons";

export const TagsEditForm = (props: ITagsEditFormProps) => {
  const { tags, selectedTags, selectTags, updateTagsList } = props;

  const { t } = useTranslation();

  const [localSelectedTags, setLocalSelectedTags] = useState(selectedTags);
  const [newTag, setNewTag] = useState("");

  const addNewTag = (tag: string) => {
    if (
      !tags.find((it) => it.trim().toLowerCase() === tag.trim().toLowerCase())
    ) {
      updateTagsList([tag, ...tags]);
      setLocalSelectedTags([tag, ...localSelectedTags]);
    }

    setNewTag("");
  };

  const selectAllTags = () => {
    if (localSelectedTags.length === tags.length) {
      setLocalSelectedTags([]);
    } else {
      setLocalSelectedTags(tags);
    }
  };

  const getListPointData = (index: number) => {
    const tag = tags[index];
    const isSelectedTag = !!localSelectedTags.find((it) => it === tag);
    const itemTemplate = (
      <ListItemSelector
        className="flex-row"
        listItemName={tag}
        value={isSelectedTag}
        key={tag}
        onClick={() =>
          isSelectedTag
            ? setLocalSelectedTags(localSelectedTags.filter((it) => it !== tag))
            : setLocalSelectedTags([...localSelectedTags, tag])
        }
      />
    );

    return {
      itemTemplate,
      name: tag,
      tag: "",
    };
  };

  const getToggleAllCheckbox = () => (
    <Checkbox
      label={
        <TextBodyStandard
          className="flex items-center text-light-4"
          fontWeight="medium"
        >
          {t("select_all")}
        </TextBodyStandard>
      }
      value={localSelectedTags.length === tags.length}
      onChange={selectAllTags}
    />
  );

  const contentBeforeList = (
    <>
      <div className="flex items-end justify-between gap-x-6">
        <div className="w-full text-left">
          <Input
            value={newTag}
            label={t("tags.create_tag")}
            placeholder={t("tags.add_tag")}
            onChange={(tag) => setNewTag(tag)}
          />
        </div>
        {newTag.length > 0 && (
          <ButtonCircle
            icon={<DoneIcon size={24} />}
            onClick={() => addNewTag(newTag)}
          />
        )}
      </div>
      {tags.length > 0 && getToggleAllCheckbox()}
    </>
  );

  const footer = (
    <ActionPanel
      primaryButtonText={t("buttons.done")}
      onPrimaryButtonClick={() => {
        selectTags(localSelectedTags);
      }}
    />
  );

  return (
    <div className="px-4 overflow-y-auto h-full">
      <ListPointsWrapper
        listPoints={tags}
        contentBeforeList={contentBeforeList}
        getListPointData={getListPointData}
        customActionPanel={footer}
        disableCategoryAddButton
      />
    </div>
  );
};
