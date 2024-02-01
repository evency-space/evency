import React from "react";
import { useTranslation } from "react-i18next";
import { IMenuModal } from "./MenuModalProps";
import { ModalListItem } from "../../Modal/ModalListItem/ModalListItem";
import { IModalListItemProps } from "../../Modal/ModalListItem/ModalListItemProps";
import { ChatQuestionIcon, GearIcon, StarIcon } from "../../../../icons";

export const MenuModal = (props: IMenuModal) => {
  const {
    onSettingsClick,
    onFavoritesItemsClick,
    // onFeedbackClick,
    onQuestionsClick,
  } = props;

  const { t } = useTranslation();

  const MenuActions: IModalListItemProps[] = [
    {
      title: t("buttons.settings"),
      icon: <GearIcon size={16} />,
      onClick: () => {
        onSettingsClick();
      },
    },
    {
      title: t("buttons.favorites_items"),
      icon: <StarIcon size={16} />,
      onClick: () => {
        onFavoritesItemsClick();
      },
    },
    // {
    //   title: t("buttons.feedback_form"),
    //   icon: <ChatIcon size={16} />,
    //   onClick: () => {
    //     onFeedbackClick();
    //   },
    // },
    {
      title: t("buttons.faq"),
      icon: <ChatQuestionIcon size={16} />,
      onClick: () => {
        onQuestionsClick();
      },
    },
  ];

  return (
    <div className="flex flex-col items-start">
      {MenuActions.map((menuAction) => (
        <ModalListItem key={menuAction.title} {...menuAction} />
      ))}
    </div>
  );
};
