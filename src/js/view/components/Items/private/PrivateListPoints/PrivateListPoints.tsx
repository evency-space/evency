import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BaseListPointItem } from "../../BaseListPointItem/BaseListPointItem";
import { ListPointsWrapper } from "../../ListPointsWrapper/ListPointsWrapper";
import {
  getPrivateListPoints,
  removePrivateListPoint,
} from "../../../../../api_clients";
import { useLoading, useModal } from "../../../../../hooks";
import { IListPoint, IPrivateListPoint } from "../../../../../interfaces";
import { RemoveListItemModal } from "../../../../elements";
import { IPrivateListPointsProps } from "./PrivateListPointsProps";
import { saveCurrentListPointInLocalStorage } from "../../../../../utils/localStorage";
import {
  eventCreateListPointPageUrl,
  eventEditListPointPageUrl,
} from "../../../../../../router/constants";
import { getEmptyListPointWithCurrentCategory } from "../../utils";
import { convertListPointToIEditListPoint } from "../../../../../utils";

export const PrivateListPoints = (props: IPrivateListPointsProps) => {
  const { accessIds } = props;

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [listPoints, setListPoints] = useState<IPrivateListPoint[]>([]);

  const { setLoading } = useLoading();

  const modalContext = useModal();

  const goToListPointEditPage = (listPoint: IListPoint | IPrivateListPoint) => {
    const currentListPoint = convertListPointToIEditListPoint({
      point: listPoint,
      pointType: "private",
    });

    saveCurrentListPointInLocalStorage(currentListPoint);
    navigate(
      listPoint.pointUid
        ? eventEditListPointPageUrl({
            eventUid: accessIds.eventUid,
            listPointUid: listPoint.pointUid,
          })
        : eventCreateListPointPageUrl({
            eventUid: accessIds.eventUid,
          }),
      { state: { listPointType: "private", listPointUid: listPoint.pointUid } }
    );
  };

  const getListPoints = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getPrivateListPoints(accessIds);
      setListPoints((await response.json()) as IPrivateListPoint[]);
    } finally {
      setLoading(false);
    }
  }, [accessIds, setLoading]);

  const removeListPoint = async (listPoint: IPrivateListPoint) => {
    try {
      setLoading(true);

      if (listPoint.pointUid) {
        await removePrivateListPoint({
          ...accessIds,
          pointUid: listPoint.pointUid,
        });

        await getListPoints();
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    modalContext.setContent(undefined);
  };

  const showRemoveListPointModal = (listPoint: IPrivateListPoint) =>
    modalContext.setContent({
      content: (
        <RemoveListItemModal
          title={t("modals.remove_list_point.title", {
            listPointName: listPoint.point.item.name,
          })}
          onRemoveClick={() => {
            closeModal();
            void removeListPoint(listPoint);
          }}
          onCancelClick={closeModal}
        />
      ),
      onClose: closeModal,
    });

  const getListPointData = (index: number) => {
    const listPoint = listPoints[index];
    const itemTemplate = listPoint && (
      <BaseListPointItem
        name={listPoint.point.item.name}
        unit={listPoint.point.unit}
        count={listPoint.count}
        key={listPoint.pointUid}
        onEdit={() => goToListPointEditPage(listPoint)}
        onRemove={() => showRemoveListPointModal(listPoint)}
      />
    );

    return {
      itemTemplate,
      tag: listPoint.point.item.tags[0],
      name: listPoint.point.item.name,
    };
  };

  useEffect(() => {
    if (listPoints.length === 0) {
      void getListPoints();
    }
  }, [getListPoints, listPoints.length]);

  return (
    <ListPointsWrapper
      listPoints={listPoints}
      getListPointData={getListPointData}
      onCreateListPoint={(category) =>
        goToListPointEditPage(getEmptyListPointWithCurrentCategory(category))
      }
    />
  );
};
