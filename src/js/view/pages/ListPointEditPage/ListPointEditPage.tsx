import React, { useEffect, useState } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import {
  deleteCurrentListPointFromLocalStorage,
  getCurrentListPointFromLocalStorage,
  getFavoritesListUidFromLocalStorage,
} from "../../../utils/localStorage";
import { ListPointEdit } from "../../components/Items/ListPointEdit/ListPointEdit";
import { useLoading, useModal } from "../../../hooks";

import { IAccessIds, IListPoint } from "../../../interfaces";
import { TProvidedEvent } from "../../../../router/types";
import { DuplicateListPointModal, Loader } from "../../elements";
import {
  eventEditListPointPageUrl,
  eventPageUrl,
  favoritesListPointsPageUrl,
} from "../../../../router/constants";
import {
  addFavoritesListPoints,
  changeCommonListPointBindStatus,
  editCommonListPoint,
  editFavoriteListPoint,
  editPrivateListPoint,
  getDuplicateListPoints,
} from "../../../api_clients";
import { convertIEditListPointToIListPoint } from "../../../utils";
import { IEditListPoint } from "../../elements/Forms/ListPointEditForm/ListPointEditFormProps";
import { CommonListPointsUtils } from "../../components/Items/common/utils";

export const ListPointEditPage = () => {
  const routeData = useLoaderData() as TProvidedEvent;

  const { setLoading } = useLoading();

  const navigate = useNavigate();

  const modalContext = useModal();

  const [accessIds, setAccessIds] = useState<IAccessIds>({
    eventUid: "",
    memberUid: "",
  });

  const [listPoint, setListPoint] = useState<IEditListPoint>();

  const commonListPointsUtils = CommonListPointsUtils({ accessIds });

  const isCreationMode = !listPoint?.pointUid && !listPoint?.itemUid;

  const goBackToListPointsPage = (url?: string) => {
    navigate(url || eventPageUrl({ eventUid: accessIds?.eventUid }), {
      replace: true,
    });
    deleteCurrentListPointFromLocalStorage();
  };

  const getListPointData = (point: IEditListPoint) => {
    const mode: "add" | "edit" = isCreationMode ? "add" : "edit";
    const convertedListPoint = convertIEditListPointToIListPoint(point);

    return {
      mode,
      listPoint: convertedListPoint,
      ...accessIds,
    };
  };

  const changePrivateListPoint = async (
    changeableListPoint: IEditListPoint
  ) => {
    await editPrivateListPoint(getListPointData(changeableListPoint));
    goBackToListPointsPage();
  };

  const changeFavoriteListPoint = async (
    changeableListPoint: IEditListPoint
  ) => {
    const convertedListPoint =
      convertIEditListPointToIListPoint(changeableListPoint);

    if (isCreationMode) {
      await addFavoritesListPoints({
        listUid: getFavoritesListUidFromLocalStorage() || "",
        listPoints: [convertedListPoint],
      });
    } else {
      await editFavoriteListPoint({ listPoint: convertedListPoint });
    }

    goBackToListPointsPage(favoritesListPointsPageUrl());
  };

  const changeCommonListPoint = async (changeableListPoint: IEditListPoint) => {
    const listPointData = getListPointData(changeableListPoint);
    const changedListPoint = await editCommonListPoint(listPointData);

    if (isCreationMode && changeableListPoint.takeIt) {
      await commonListPointsUtils
        .checkListPointAvailability({
          pointUid: changedListPoint.pointUid,
        })
        .then(async () => {
          await changeCommonListPointBindStatus({
            ...accessIds,
            pointUid: changedListPoint.pointUid,
            count: changeableListPoint.count,
          });
        });
    }

    goBackToListPointsPage();
  };

  const showDuplicateListPointModal = (
    baseListPoint: IEditListPoint,
    duplicateListPoint: IListPoint
  ) => {
    if (accessIds) {
      modalContext.setContent({
        content: (
          <DuplicateListPointModal
            accessIds={accessIds}
            listPoint={duplicateListPoint}
            onPrimaryButtonClick={() => goBackToListPointsPage()}
            onSecondaryButtonClick={() => {
              void changeCommonListPoint(baseListPoint);
            }}
            setListPointForEdit={(point) => {
              navigate(
                eventEditListPointPageUrl({
                  eventUid: accessIds.eventUid,
                  listPointUid: point.pointUid || "",
                }),
                {
                  state: {
                    listPointType: "common",
                    listPointUid: point.pointUid,
                  },
                }
              );
            }}
          />
        ),
        onClose: () => modalContext.setContent(undefined),
      });
    }
  };

  const checkDuplicates = async (changeableListPoint: IEditListPoint) => {
    if (isCreationMode) {
      const duplicateListPoints = await getDuplicateListPoints({
        eventUid: accessIds.eventUid,
        pointName: changeableListPoint.name,
      });

      if (duplicateListPoints?.length > 0) {
        showDuplicateListPointModal(
          changeableListPoint,
          duplicateListPoints[0]
        );
        return Promise.reject();
      }
    }

    return Promise.resolve();
  };

  const changeListPoint = async (changeableListPoint: IEditListPoint) => {
    const { pointType } = changeableListPoint;

    try {
      setLoading(true);

      switch (pointType) {
        case "private":
          void changePrivateListPoint(changeableListPoint);
          break;
        case "favorite":
          void changeFavoriteListPoint(changeableListPoint);
          break;
        case "common":
          await checkDuplicates(changeableListPoint).then(() =>
            changeCommonListPoint(changeableListPoint)
          );
          break;
        default:
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (routeData) {
      void routeData.data.then((d) => {
        if (d.accessIds) {
          setAccessIds(d.accessIds);
        }
      });
    }

    const currentListPoint = getCurrentListPointFromLocalStorage();

    if (currentListPoint) {
      setListPoint(currentListPoint);
    }
  }, [routeData]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Await
        resolve={routeData?.data}
        errorElement={<p>Error list point edit page loading</p>}
      >
        {listPoint && (
          <ListPointEdit
            listPoint={listPoint}
            isCreationMode={isCreationMode}
            onClick={(editedListPoint) => {
              void changeListPoint(editedListPoint);
            }}
          />
        )}
      </Await>
    </React.Suspense>
  );
};
