import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonListPointItem } from "../CommonListPointItem/CommonListPointItem";
import { ListPointsWrapper } from "../../ListPointsWrapper/ListPointsWrapper";
import {} from "../../../../../utils";
import {
  changeCommonListPointBindStatus,
  deleteCommonListPoint,
  getCommonListPoints,
  getMemberBindings,
  lockCommonListPoint,
  unlockCommonListPoint,
} from "../../../../../api_clients";
import { useLoading, useModal } from "../../../../../hooks";
import {
  ICommonListPoint,
  IListPoint,
  IListPointBinding,
} from "../../../../../interfaces";
import {
  BindListPointModal,
  BlockedListPointModal,
  ListPointActionModal,
} from "../../../../elements";
import { ICommonListPointsProps } from "./CommonListPointsProps";
import { saveCurrentListPointInLocalStorage } from "../../../../../utils/localStorage";
import {
  eventCreateListPointPageUrl,
  eventEditListPointPageUrl,
} from "../../../../../../router/constants";
import { getEmptyListPointWithCurrentCategory } from "../../utils";

export const CommonListPoints = (props: ICommonListPointsProps) => {
  const { accessIds } = props;

  const navigate = useNavigate();

  const { setLoading } = useLoading();

  const modalContext = useModal();

  const [listPoints, setListPoints] = useState<ICommonListPoint[]>([]);

  const [selectedListPoint, setSelectedListPoint] =
    useState<ICommonListPoint>();

  const [loadingPointUid, setLoadingPointUid] = useState<string>("");

  const closeModal = () => {
    modalContext.setContent(undefined);

    if (selectedListPoint) {
      void unlockCommonListPoint({
        ...accessIds,
        pointUid: selectedListPoint.pointUid,
      });

      setSelectedListPoint(undefined);
    }
  };

  const showModal = ({
    listPoint,
    content,
  }: {
    listPoint?: ICommonListPoint;
    content: JSX.Element;
  }) => {
    modalContext.setContent({ content, onClose: closeModal });

    if (listPoint) {
      setSelectedListPoint(listPoint);
    }
  };

  const goToListPointEditPage = (listPoint: IListPoint | ICommonListPoint) => {
    saveCurrentListPointInLocalStorage(listPoint);
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
      closeModal();

      await deleteCommonListPoint({
        ...accessIds,
        pointUid: listPoint.pointUid,
      });

      await getListPoints();
    } finally {
      setLoading(false);
    }
  };

  const updateListPointMemberBindings = async ({
    listPoint,
  }: {
    listPoint: ICommonListPoint;
  }) => {
    try {
      setLoadingPointUid(listPoint.pointUid);

      const response = await getMemberBindings({
        eventUid: accessIds.eventUid,
        pointUid: listPoint.pointUid,
      });

      const index = listPoints.findIndex(
        (lp) => lp.pointUid === listPoint.pointUid
      );

      listPoints[index].bindings =
        (await response.json()) as IListPointBinding[];
    } finally {
      setLoadingPointUid("");
    }
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

  const checkListPointAvailability = async ({
    listPoint,
    cb,
  }: {
    listPoint: ICommonListPoint;
    cb: (listPoint: ICommonListPoint) => void | Promise<void>;
  }) => {
    try {
      setLoading(true);

      const { status } = await lockCommonListPoint({
        ...accessIds,
        pointUid: listPoint.pointUid,
      });

      if (status === 201) {
        await cb(listPoint);
      } else {
        showBlockedListPointModal();
      }
    } finally {
      setLoading(false);
    }
  };

  const editListPoint = (listPoint: ICommonListPoint) => {
    closeModal();
    goToListPointEditPage(listPoint);
  };

  const bindListPoint = async ({
    pointUid,
    count,
  }: {
    pointUid: string;
    count: number;
  }) => {
    try {
      setLoading(true);
      closeModal();

      const payload = {
        ...accessIds,
        pointUid,
        count: 0,
      };
      if (count !== 0) {
        payload.count = count;
      }

      await changeCommonListPointBindStatus(payload);

      await getListPoints();
    } finally {
      setLoading(false);
    }
  };

  const showBindModal = (listPoint: ICommonListPoint) => {
    const binding = listPoint.bindings.find(
      (b) => b.member.memberUid === accessIds.memberUid
    );
    const countItemTaken = binding ? binding.count : 0;

    showModal({
      listPoint,
      content: (
        <BindListPointModal
          listPoint={listPoint}
          countItemTaken={countItemTaken}
          onClick={(count) => {
            void bindListPoint({ pointUid: listPoint.pointUid, count });
          }}
        />
      ),
    });
  };

  const showActionListPointModal = (listPoint: ICommonListPoint) => {
    showModal({
      listPoint,
      content: (
        <ListPointActionModal
          listPointName={listPoint.item.name}
          showDeletionWarningMessage
          onEditClick={() => {
            void checkListPointAvailability({
              listPoint,
              cb: editListPoint,
            });
          }}
          onRemoveClick={() => {
            void checkListPointAvailability({
              listPoint,
              cb: removeListPoint,
            });
          }}
        />
      ),
    });
  };

  const getListPointData = (index: number) => {
    const listPoint = listPoints[index];

    const itemTemplate = (
      <CommonListPointItem
        listPoint={listPoint}
        key={listPoint.pointUid}
        memberUid={accessIds.memberUid}
        loading={loadingPointUid === listPoint.pointUid}
        onBindListPoint={() => {
          void checkListPointAvailability({
            listPoint,
            cb: showBindModal,
          });
        }}
        onShowListPointSettings={() => {
          void showActionListPointModal(listPoint);
        }}
        onClickTitle={() => {
          void updateListPointMemberBindings({ listPoint });
        }}
      />
    );

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
