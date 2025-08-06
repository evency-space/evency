import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ListPointsWrapper, ListItemSelector } from "../../../components";
import { Loader, TextBodyStandard, TitleH1 } from "../../../elements";
import { SelectedFavoritesButton } from "../SelectedFavoritesButton/SelectedFavoritesButton";

import { TSelectedFavoritesItems } from "../types";
import { TProvidedEvent } from "../../../../../router/types";
import { IAccessIds, IFavoriteListPoint } from "../../../../interfaces";
import { useLoading } from "../../../../hooks";
import {
  getCombinedList,
  insertFavoriteListPoints,
} from "../../../../api_clients";
import { Checkbox } from "../../../elements/inputs/Checkbox/Checkbox";
import {
  getSelectedListPointCount,
  getUpdatedSelectedListPoints,
} from "../utils";
import { getFavoritesListUidFromLocalStorage } from "../../../../utils/localStorage";
import { Toast } from "../../../elements/Toasts/Toast";
import { eventPageUrl } from "../../../../../router/constants";
import { createFavoriteListFromOldList } from "../../../../api_clients/listPoint/favoriteListPoint/utils";

export const ExportFavoritesListPointsPage = () => {
  const routeData = useLoaderData() as TProvidedEvent;

  const { setLoading } = useLoading();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [accessIds, setAccessIds] = useState<IAccessIds>();

  const [listPoints, setListPoints] = useState<IFavoriteListPoint[]>([]);

  const [selectedListPoints, setSelectedListPoints] =
    useState<TSelectedFavoritesItems>({});

  const getSelectedListPointsCount = useCallback(
    () => Object.values(selectedListPoints).filter((count) => count > 0).length,
    [selectedListPoints]
  );

  const goBackToEventPage = () => {
    navigate(eventPageUrl({ eventUid: accessIds?.eventUid || "" }), {
      replace: true,
    });
  };

  const changeSelectedListPoints = (key?: string, count = 0) => {
    const points = getUpdatedSelectedListPoints({
      listPoints,
      selectedListPoints,
      key,
      count,
    });

    setSelectedListPoints(points);
  };

  const exportListPointsToFavorites = async () => {
    try {
      setLoading(true);

      const selectedItemUids = Object.keys(selectedListPoints);
      const selectedPointUids = listPoints
        .filter((listPoint) =>
          selectedItemUids.includes(listPoint.item.itemUid)
        )
        .map((listPoint) => listPoint.pointUid);

      if (!getFavoritesListUidFromLocalStorage()) {
        await createFavoriteListFromOldList();
      }

      await insertFavoriteListPoints({
        listUid: getFavoritesListUidFromLocalStorage() || "",
        listPointsUids: selectedPointUids,
      });

      goBackToEventPage();
      toast(<Toast text={t("pages.export_favorites.successfully_exported")} />);
    } finally {
      setLoading(false);
    }
  };

  const title = <TitleH1>{t("pages.export_favorites.title")}</TitleH1>;

  const getToggleAllCheckbox = () => {
    const unselectedPointExists =
      listPoints.length !== Object.values(selectedListPoints).length;

    return (
      <Checkbox
        label={
          <TextBodyStandard
            className="flex items-center text-light-4"
            fontWeight="medium"
          >
            {t("select_all")}
          </TextBodyStandard>
        }
        value={!unselectedPointExists}
        onChange={() => changeSelectedListPoints()}
      />
    );
  };

  const getListPoints = useCallback(
    async ({
      eventUid,
      memberUid,
    }: {
      eventUid: string;
      memberUid: string;
    }) => {
      try {
        setLoading(true);

        const list = await getCombinedList({
          eventUid,
          memberUid,
        });

        setListPoints(list);
      } finally {
        setLoading(false);
      }
    },
    [setListPoints, setLoading]
  );

  const getListPointData = (index: number) => {
    const {
      item: { name, tags, itemUid },
      unit,
    } = listPoints[index];
    const selectedCount = selectedListPoints[itemUid] || 0;

    const itemTemplate = (
      <ListItemSelector
        listItemName={name}
        value={selectedCount > 0}
        key={index}
        onClick={() =>
          changeSelectedListPoints(
            itemUid,
            getSelectedListPointCount({ count: selectedCount, unit })
          )
        }
      />
    );

    return {
      itemTemplate,
      tag: tags[0],
      name,
    };
  };

  const pageFooter = (
    <SelectedFavoritesButton
      count={getSelectedListPointsCount()}
      onClick={() => {
        void exportListPointsToFavorites();
      }}
    />
  );

  useEffect(() => {
    if (routeData) {
      void routeData.data.then((d) => {
        if (d.event && d.accessIds) {
          setAccessIds(d.accessIds);
          void getListPoints({
            eventUid: d.event.eventUid,
            memberUid: d.accessIds.memberUid,
          });
        }
      });
    }
  }, [routeData, getListPoints]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Await resolve={routeData?.data} errorElement={<p>Error page loading</p>}>
        <ListPointsWrapper
          disableCategoryAddButton
          title={title}
          listPoints={listPoints}
          getListPointData={getListPointData}
          contentBeforeList={getToggleAllCheckbox()}
          customActionPanel={pageFooter}
        />
      </Await>
    </React.Suspense>
  );
};
