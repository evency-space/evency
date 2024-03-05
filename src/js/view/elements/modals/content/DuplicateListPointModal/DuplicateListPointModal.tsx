import React from "react";
import { useTranslation } from "react-i18next";
import { IDuplicateListPointModalProps } from "./DuplicateListPointModalProps";
import { ActionPanel } from "../../../ActionPanel/ActionPanel";
import { ModalTitle } from "../../Modal/ModalTitle/ModalTitle";
import { TagSmall } from "../../../tags";
import { ButtonTransparent } from "../../../buttons";
import { ModalDescription } from "../../Modal/ModalDescription/ModalDescription";
import { TextBodyStandard } from "../../../typography";
import { saveCurrentListPointInLocalStorage } from "../../../../../utils/localStorage";
import { lockCommonListPoint } from "../../../../../api_clients";
import { useLoading, useModal } from "../../../../../hooks";
import { BlockedListPointModal } from "../BlockedListPointModal/BlockedListPointModal";
import { convertListPointToIEditListPoint } from "../../../../../utils";

export const DuplicateListPointModal = (
  props: IDuplicateListPointModalProps
) => {
  const {
    accessIds,
    listPoint,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    setListPointForEdit,
  } = props;

  const { setLoading } = useLoading();

  const modalContext = useModal();

  const { t } = useTranslation();

  const goToListPointEditPage = () => {
    const currentListPoint = convertListPointToIEditListPoint({
      point: listPoint,
      pointType: "common",
    });

    saveCurrentListPointInLocalStorage(currentListPoint);
    setListPointForEdit(currentListPoint);
  };

  const closeModal = () => {
    modalContext.setContent(undefined);
  };

  const showModal = ({ content }: { content: JSX.Element }) => {
    modalContext.setContent({ content, onClose: closeModal });
  };

  const showBlockedListPointModal = () =>
    showModal({
      content: (
        <BlockedListPointModal
          onClick={() => {
            closeModal();
          }}
        />
      ),
    });

  const checkListPointAvailability = async () => {
    try {
      setLoading(true);

      const { status } = await lockCommonListPoint({
        ...accessIds,
        pointUid: listPoint.pointUid,
      });

      if (status === 201) {
        goToListPointEditPage();
      } else {
        showBlockedListPointModal();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalTitle title={t("modals.duplicated_list_point.title")} />

      <div>
        <ModalDescription
          description={t("modals.duplicated_list_point.description")}
        />
        <ButtonTransparent
          className="underline btn-xs"
          onClick={() => {
            void checkListPointAvailability();
          }}
        >
          {t("modals.duplicated_list_point.description_button")}
        </ButtonTransparent>
        <div className="flex justify-between bg-dark-1 p-4 rounded-lg mt-4">
          <TextBodyStandard
            className="text-light-4 text-left"
            fontWeight="semibold"
          >
            {listPoint.item.name}
          </TextBodyStandard>
          <TagSmall isButton={false} className="shrink-0">
            {`${listPoint.count} ${t(
              `list_point.short_units.${listPoint.unit}`
            )}`}
          </TagSmall>
        </div>
      </div>

      <ActionPanel
        primaryButtonText={t(
          "modals.duplicated_list_point.primary_button_text"
        )}
        secondaryButtonText={t(
          "modals.duplicated_list_point.secondary_button_text"
        )}
        onPrimaryButtonClick={onPrimaryButtonClick}
        onSecondaryButtonClick={onSecondaryButtonClick}
      />
    </>
  );
};
