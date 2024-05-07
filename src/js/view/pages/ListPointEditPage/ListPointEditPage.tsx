import React, { useEffect, useState } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import {
  deleteCurrentListPointFromLocalStorage,
  getCurrentListPointFromLocalStorage,
  pushFavoriteListPointUidInLocalStorage,
} from "../../../utils/localStorage";
import { ListPointEdit } from "../../components/Items/ListPointEdit/ListPointEdit";
import { useLoading, useModal } from "../../../hooks";

import {
  IAccessIds,
  IFavoriteListPoint,
  IListPoint,
} from "../../../interfaces";
import { TProvidedEvent } from "../../../../router/types";
import { DuplicateListPointModal, Loader } from "../../elements";
import {
  eventEditListPointPageUrl,
  eventPageUrl,
  favoritesListPointsPageUrl,
} from "../../../../router/constants";
import {
  editCommonListPoint,
  editFavoriteListPoint,
  editPrivateListPoint,
  getDuplicateListPoints,
} from "../../../api_clients";
import { convertIEditListPointToIListPoint } from "../../../utils";
import { IEditListPoint } from "../../elements/Forms/ListPointEditForm/ListPointEditFormProps";

export const ListPointEditPage = () => {
  const routeData = useLoaderData() as TProvidedEvent;

  const { setLoading } = useLoading();

  const navigate = useNavigate();

  const modalContext = useModal();

  const [accessIds, setAccessIds] = useState<IAccessIds>();

  const [listPoint, setListPoint] = useState<IEditListPoint>();

  const isCreationMode = !listPoint?.pointUid && !listPoint?.itemUid;

  const goBackToListPointsPage = (url?: string) => {
    navigate(url || eventPageUrl({ eventUid: accessIds?.eventUid || "" }), {
      replace: true,
    });
    deleteCurrentListPointFromLocalStorage();
  };

  const getListPointData = (point: IEditListPoint) => {
    const mode: "add" | "edit" = isCreationMode ? "add" : "edit";
    const convertedListPoint = convertIEditListPointToIListPoint(point);

    return {
      mode,
      eventUid: accessIds?.eventUid || "",
      memberUid: accessIds?.memberUid || "",
      listPoint: convertedListPoint,
    };
  };

  const addDuplicateCommonListPoint = async (baseListPoint: IEditListPoint) => {
    try {
      setLoading(true);

      await editCommonListPoint(getListPointData(baseListPoint));
      goBackToListPointsPage();
    } finally {
      setLoading(false);
    }
  };

  const showDuplicateListPointModal = (
    baseListPoint: IEditListPoint,
    duplicateListPoint: IListPoint,
  ) => {
    if (accessIds) {
      modalContext.setContent({
        content: (
          <DuplicateListPointModal
            accessIds={accessIds}
            listPoint={duplicateListPoint}
            onPrimaryButtonClick={() => goBackToListPointsPage()}
            onSecondaryButtonClick={() => {
              void addDuplicateCommonListPoint(baseListPoint);
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
                },
              );
            }}
          />
        ),
        onClose: () => modalContext.setContent(undefined),
      });
    }
  };

  const changeListPoint = async (editedListPoint: IEditListPoint) => {
    try {
      setLoading(true);

      const { pointType } = editedListPoint;
      const listPointData = getListPointData(editedListPoint);
      let navigateUrl;

      if (pointType === "common") {
        if (isCreationMode) {
          const duplicateListPoints = await getDuplicateListPoints({
            eventUid: accessIds?.eventUid || "",
            pointName: editedListPoint.name,
          });

          if (duplicateListPoints?.length > 0) {
            showDuplicateListPointModal(
              editedListPoint,
              duplicateListPoints[0],
            );
            return;
          }
        }

        await editCommonListPoint(listPointData);
      } else if (pointType === "private") {
        await editPrivateListPoint(listPointData);
      } else if (pointType === "favorite") {
        const points = (await editFavoriteListPoint(
          listPointData,
        )) as IFavoriteListPoint[];

        if (isCreationMode) {
          points.forEach((point) => {
            pushFavoriteListPointUidInLocalStorage(point.item.itemUid);
          });
        }

        navigateUrl = favoritesListPointsPageUrl();
      }

      goBackToListPointsPage(navigateUrl);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (routeData) {
      void routeData.data.then((d) => {
        setAccessIds(d.accessIds);
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
