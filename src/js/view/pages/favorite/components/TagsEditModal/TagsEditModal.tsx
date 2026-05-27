import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITagsEditModalProps } from "./TagsEditModalProps";
import { ButtonTransparent, TagsGroup } from "../../../../elements";
import { TagsEditForm } from "./TagsEditForm/TagsEditForm";
import { getTags } from "../../../../../api_clients";
import { getFavoritesListUidFromLocalStorage } from "../../../../../utils/localStorage";
import { LoaderIcon, PlusIcon } from "../../../../icons";
import { useModal } from "../../../../../hooks";

export const TagsEditModal = (props: ITagsEditModalProps) => {
  const { selectedTags, onChange } = props;

  const { t } = useTranslation();

  const [allTags, setAllTags] = useState<string[]>([]);
  const [tagsLoading, setTagsLoading] = useState<boolean>(true);

  const modalContext = useModal();

  const getAllTags = useCallback(async () => {
    try {
      setTagsLoading(true);

      const list = await getTags({
        listUid: getFavoritesListUidFromLocalStorage() || "",
      });

      if (list) {
        setAllTags(list);
      }
    } finally {
      setTagsLoading(false);
    }
  }, [setTagsLoading]);

  const closeModal = () => {
    modalContext.setContent(undefined);
  };

  const onChangeMenuModal = (tags: string[]) => {
    closeModal();
    onChange(tags);
  };

  const updateTagsList = (tags: string[]) => {
    setAllTags(tags);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    showMenuModal(tags);
  };

  const showMenuModal = (tags: string[]) => {
    if (!tagsLoading) {
      modalContext.setContent({
        className: "h-[90%] pt-4 pb-0 px-0",
        content: (
          <TagsEditForm
            tags={tags}
            selectedTags={selectedTags}
            selectTags={onChangeMenuModal}
            updateTagsList={updateTagsList}
          />
        ),
        title: t("tags.select_tags"),
        onClose: closeModal,
      });
    }
  };

  useEffect(() => {
    if (allTags.length === 0) {
      void getAllTags();
    }
  }, [allTags.length, getAllTags]);

  return (
    <div>
      <ButtonTransparent
        className="px-0"
        type="button"
        icon={
          tagsLoading ? (
            <LoaderIcon size={16} className="animate-spin" />
          ) : (
            <PlusIcon size={16} />
          )
        }
        onClick={() => showMenuModal(allTags)}
      >
        {t("tags.select_tags")}
      </ButtonTransparent>
      <TagsGroup
        tags={selectedTags}
        size="s"
        onClick={() => showMenuModal(allTags)}
      />
    </div>
  );
};
