import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonListPointItem } from "../CommonListPointItem/CommonListPointItem";
import { ListPointsWrapper } from "../../ListPointsWrapper/ListPointsWrapper";
import { convertListPointToIEditListPoint } from "../../../../../utils";
import {
  deleteCommonListPoint,
  getCommonListPoints,
} from "../../../../../api_clients";
import { useLoading } from "../../../../../hooks";
import { ICommonListPoint, IListPoint } from "../../../../../interfaces";
import { ListPointActionModal } from "../../../../elements";
import { ICommonListPointsProps } from "./CommonListPointsProps";
import {
  getCommonListPointViewMode,
  saveCurrentListPointInLocalStorage,
} from "../../../../../utils/localStorage";
import {
  eventCreateListPointPageUrl,
  eventEditListPointPageUrl,
} from "../../../../../../router/constants";
import { getEmptyListPointWithCurrentCategory } from "../../utils";
import { CommonListPointsUtils } from "../utils";
import { TwoLinesCommonListPointItem } from "../TwoLinesCommonListPointItem/TwoLinesCommonListPointItem";

export const CommonListPoints = (props: ICommonListPointsProps) => {
  const { accessIds } = props;

  const navigate = useNavigate();

  const { setLoading } = useLoading();

  const [listPoints, setListPoints] = useState<ICommonListPoint[]>([]);

  const commonListPointsUtils = CommonListPointsUtils({ accessIds });

  const goToListPointEditPage = (listPoint: IListPoint | ICommonListPoint) => {
    const currentListPoint = convertListPointToIEditListPoint({
      point: listPoint,
      pointType: "common",
    });

    saveCurrentListPointInLocalStorage(currentListPoint);
    navigate(
      listPoint.pointUid
        ? eventEditListPointPageUrl({
            eventUid: accessIds.eventUid,
            listPointUid: listPoint.pointUid,
          })
        : eventCreateListPointPageUrl({ eventUid: accessIds.eventUid }),
      { state: { listPointType: "common", listPointUid: listPoint.pointUid } }
    );
  };

  const getListPoints = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCommonListPoints(accessIds);
      const commonListPointsResponse =
        (await response.json()) as ICommonListPoint[];

      setListPoints(commonListPointsResponse);
    } finally {
      setLoading(false);
    }
  }, [accessIds, setLoading]);

  const removeListPoint = async (listPoint: IListPoint) => {
    try {
      setLoading(true);
      commonListPointsUtils.closeModal();

      await deleteCommonListPoint({
        ...accessIds,
        pointUid: listPoint.pointUid,
      });

      await getListPoints();
    } finally {
      setLoading(false);
    }
  };

  const checkListPointAvailability = ({
    listPoint,
  }: {
    listPoint: ICommonListPoint;
  }): Promise<ICommonListPoint> =>
    new Promise((resolve) => {
      commonListPointsUtils
        .checkListPointAvailability({
          pointUid: listPoint.pointUid,
        })
        .then(() => resolve(listPoint))
        .catch(commonListPointsUtils.showBlockedListPointModal);
    });

  const editListPoint = (listPoint: ICommonListPoint) => {
    commonListPointsUtils.closeModal();
    goToListPointEditPage(listPoint);
  };

  const showActionListPointModal = (listPoint: ICommonListPoint) => {
    commonListPointsUtils.showModal({
      listPoint,
      content: (
        <ListPointActionModal
          listPointName={listPoint.item.name}
          showDeletionWarningMessage
          onEditClick={() => {
            void checkListPointAvailability({ listPoint }).then(editListPoint);
          }}
          onRemoveClick={() => {
            void checkListPointAvailability({ listPoint }).then(
              removeListPoint
            );
          }}
        />
      ),
    });
  };

  const getListPointData = (index: number) => {
    const listPoint = listPoints[index];

    const viewMode = getCommonListPointViewMode() || "oneLine";
    let itemTemplate;

    if (viewMode === "twoLines") {
      itemTemplate = (
        <TwoLinesCommonListPointItem
          listPoint={listPoint}
          accessIds={accessIds}
          key={listPoint.pointUid}
        />
      );
    } else {
      itemTemplate = (
        <CommonListPointItem
          listPoint={listPoint}
          key={listPoint.pointUid}
          accessIds={accessIds}
          onShowListPointSettings={() => {
            void showActionListPointModal(listPoint);
          }}
          updateListPoint={getListPoints}
        />
      );
    }

    return {
      itemTemplate,
      tag: listPoint.item.tags[0],
      name: listPoint.item.name,
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
      onCreateListPoint={(category) => {
        goToListPointEditPage(getEmptyListPointWithCurrentCategory(category));
      }}
    />
  );
};
