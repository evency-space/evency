import React, { useEffect, useState } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import {
  deleteCurrentListPointFromLocalStorage,
  getCurrentListPointFromLocalStorage,
  getListPointTypeFromLocalStorage,
} from "../../../utils/localStorage";
import { ListPointEdit } from "../../components/Items/ListPointEdit/ListPointEdit";

import {
  editCommonListPoint,
  editPrivateListPoint,
  getDuplicateListPoints,
} from "../../../api_clients";
import { useLoading, useModal } from "../../../hooks";

import { IAccessIds, ICommonListPoint, IListPoint } from "../../../interfaces";
import { TProvidedEvent } from "../../../../router/types";
import { DuplicateListPointModal, Loader } from "../../elements";

export const ListPointEditPage = () => {
  const routeData = useLoaderData() as TProvidedEvent;

  const { setLoading } = useLoading();

  const navigate = useNavigate();

  const modalContext = useModal();

  const [accessIds, setAccessIds] = useState<IAccessIds>();

  const [listPoint, setListPoint] = useState(
    getCurrentListPointFromLocalStorage<ICommonListPoint | IListPoint>()
  );

  const listPointType = getListPointTypeFromLocalStorage();

  const isCreationMode = !listPoint?.pointUid;

  const goBackToListPointsPage = () => {
    navigate(-1);
    deleteCurrentListPointFromLocalStorage();
  };

  const getListPointData = (lp: IListPoint) => {
    const mode: "add" | "edit" = isCreationMode ? "add" : "edit";

    return {
      mode,
      eventUid: accessIds?.eventUid || "",
      memberUid: accessIds?.memberUid || "",
      listPoint: lp,
    };
  };

  const addDuplicateCommonListPoint = async (lp: IListPoint) => {
    try {
      setLoading(true);

      await editCommonListPoint(getListPointData(lp));
      goBackToListPointsPage();
    } finally {
      setLoading(false);
    }
  };

  const showDuplicateListPointModal = (duplicateListPoint: IListPoint) => {
    if (accessIds) {
      modalContext.setContent({
        content: (
          <DuplicateListPointModal
            accessIds={accessIds}
            listPoint={duplicateListPoint}
            onPrimaryButtonClick={goBackToListPointsPage}
            onSecondaryButtonClick={(lp) => {
              void addDuplicateCommonListPoint(lp);
            }}
          />
        ),
        onClose: () => modalContext.setContent(undefined),
      });
    }
  };

  const changeListPoint = async (editedListPoint: IListPoint) => {
    try {
      setLoading(true);

      if (accessIds) {
        const listPointData = getListPointData(editedListPoint);

        if (listPointType === "common") {
          if (isCreationMode) {
            const duplicateListPoints = await getDuplicateListPoints({
              eventUid: accessIds.eventUid,
              pointName: editedListPoint.item.name,
            });

            if (duplicateListPoints?.length > 0) {
              showDuplicateListPointModal(duplicateListPoints[0]);
              return;
            }
          }

          await editCommonListPoint(listPointData);
        } else if (listPointType === "private") {
          await editPrivateListPoint(listPointData);
        }

        goBackToListPointsPage();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (routeData) {
      void routeData.data.then((d) => {
        setAccessIds(d.accessIds);
      });
      setListPoint(getCurrentListPointFromLocalStorage());
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
