import React from "react";
import { useTranslation } from "react-i18next";
import { IEventActionModal } from "./EventActionModalProps";
import { ModalListItem } from "../../../Modal/ModalListItem/ModalListItem";
import { IModalListItemProps } from "../../../Modal/ModalListItem/ModalListItemProps";

import { GetEventActions } from "../actions";
import { StarIcon } from "../../../../../icons";

export const EventActionModal = (props: IEventActionModal) => {
  const {
    onShareEvent,
    onLeaveEvent,
    onEditEvent,
    onEditMembers,
    onLogoutClick,
    onImportFavorites,
  } = props;

  const { t } = useTranslation();

  const eventActions = GetEventActions({
    onShareEvent,
    onLeaveEvent,
    onEditEvent,
    onEditMembers,
    onLogoutClick,
  });

  const EventActions: IModalListItemProps[] = [
    eventActions.share,
    eventActions.leave,
    eventActions.editEvent,
    {
      title: t("modals.event_action.import_favorites"),
      icon: <StarIcon size={16} />,
      onClick: () => {
        onImportFavorites();
      },
    },
    eventActions.members,
    eventActions.logout,
  ];

  return (
    <div className="flex flex-col items-start">
      {EventActions.map((eventAction) => (
        <ModalListItem key={eventAction.title} {...eventAction} />
      ))}
    </div>
  );
};
