import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { saveCurrentListPointInLocalStorage } from "../../../../utils/localStorage";
import {
  ActionPanel,
  RemoveListItemModal,
  TextBodyStandard,
  TitleH1,
} from "../../../elements";
import { IListPoint } from "../../../../interfaces";
import {
  deleteListPointFromLocalStorageRecommendedListPoints,
  getRecommendedListPointsFromLocalStorage,
} from "../storages";
import { ListPointsWrapper } from "../../../components/Items/ListPointsWrapper/ListPointsWrapper";
import { getEmptyListPoint } from "../../../../utils";
import { BaseListPointItem } from "../../../components/Items/BaseListPointItem/BaseListPointItem";
import {
  eventCreateRecommendedListPointPageUrl,
  eventEditRecommendedListPointPageUrl,
  shareEventPageUrl,
} from "../../../../../router/constants";
import { useModal } from "../../../../hooks";
import { getEmptyListPointWithCurrentCategory } from "../../../components/Items/utils";

export const RecommendedListPointsPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { eventUid = "" } = useParams();

  const [listPoints, setListPoints] = useState<IListPoint[]>(
    getRecommendedListPointsFromLocalStorage()
  );

  const modalContext = useModal();

  const goToListPointEditPage = (listPoint: IListPoint) => {
    const index = listPoints.findIndex(
      (lp) => lp.item.name === listPoint.item.name
    );

    saveCurrentListPointInLocalStorage(listPoint);
    navigate(
      index !== -1
        ? eventEditRecommendedListPointPageUrl({ eventUid, index })
        : eventCreateRecommendedListPointPageUrl({ eventUid }),
      { state: { listPointIndex: index } }
    );
  };

  const closeModal = () => {
    modalContext.setContent(undefined);
  };

  const updateListPoints = () => {
    setListPoints(getRecommendedListPointsFromLocalStorage());
  };

  const removeListPoint = (listPointIndex: number) => {
    deleteListPointFromLocalStorageRecommendedListPoints(listPointIndex);
    updateListPoints();
    closeModal();
  };

  const addRemoveListPointModalContent = (
    listPointIndex: number,
    listPointName: string
  ) =>
    modalContext.setContent({
      content: (
        <RemoveListItemModal
          title={t("modals.remove_list_point.title", { listPointName })}
          onRemoveClick={() => removeListPoint(listPointIndex)}
          onCancelClick={closeModal}
        />
      ),
      onClose: closeModal,
    });

  const title = (
    <div className="flex flex-col">
      <TitleH1>{t("pages.recommended.title")}</TitleH1>
      <TextBodyStandard className="my-3">
        {t("pages.recommended.description")}
      </TextBodyStandard>
    </div>
  );

  const footer = (
    <ActionPanel
      primaryButtonText={t("list_point.add_item")}
      onPrimaryButtonClick={() => goToListPointEditPage(getEmptyListPoint())}
      secondaryButtonText={`> ${t("buttons.next")}`}
      onSecondaryButtonClick={() => navigate(shareEventPageUrl({ eventUid }))}
    />
  );

  const getListPointData = (index: number) => {
    const listPoint = listPoints[index];
    const itemTemplate = listPoint && (
      <BaseListPointItem
        key={listPoint.item.name}
        name={listPoint.item.name}
        unit={listPoint.unit}
        count={listPoint.count}
        onEdit={() => goToListPointEditPage(listPoint)}
        onRemove={() =>
          addRemoveListPointModalContent(
            listPoints.findIndex((lp) => lp.item.name === listPoint.item.name),
            listPoint.item.name
          )
        }
      />
    );

    return {
      itemTemplate,
      tag: listPoint.item.tags[0],
      name: listPoint.item.name,
    };
  };

  return (
    <ListPointsWrapper
      listPoints={listPoints}
      getListPointData={getListPointData}
      title={title}
      customActionPanel={footer}
      onCreateListPoint={(category) =>
        goToListPointEditPage(getEmptyListPointWithCurrentCategory(category))
      }
    />
  );
};
