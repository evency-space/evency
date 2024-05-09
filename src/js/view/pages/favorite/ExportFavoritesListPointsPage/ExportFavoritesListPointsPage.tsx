import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Await, useLoaderData } from "react-router-dom";
import { ListPointsWrapper } from "../../../components";
import { Loader, TextBodyStandard, TitleH1 } from "../../../elements";
import { SelectedFavoritesButton } from "../SelectedFavoritesButton/SelectedFavoritesButton";

import { TSelectedFavoritesItems } from "../types";
import { TProvidedEvent } from "../../../../../router/types";
import { IFavoriteListPoint } from "../../../../interfaces";
import { useLoading } from "../../../../hooks";
import {
  getCombinedList,
  insertFavoriteListPoints,
} from "../../../../api_clients";
import { ListPointItemSelector } from "../../../components/Items/ListPointItemSelector/ListPointItemSelector";
import { Checkbox } from "../../../elements/inputs/Checkbox/Checkbox";
import {
  getSelectedListPointCount,
  getUpdatedSelectedListPoints,
} from "../utils";
import { pushFavoriteListPointUidInLocalStorage } from "../../../../utils/localStorage";

export const ExportFavoritesListPointsPage = () => {
  const routeData = useLoaderData() as TProvidedEvent;

  const { setLoading } = useLoading();

  const { t } = useTranslation();

  const [listPoints, setListPoints] = useState<IFavoriteListPoint[]>([]);

  const [selectedListPoints, setSelectedListPoints] =
    useState<TSelectedFavoritesItems>({});

  const getSelectedListPointsCount = useCallback(
    () => Object.values(selectedListPoints).filter((count) => count > 0).length,
    [selectedListPoints],
  );

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

      const insertedListPoints = await insertFavoriteListPoints({
        pointUids: Object.keys(selectedListPoints),
      });

      pushFavoriteListPointUidInLocalStorage(
        insertedListPoints.map((listPoint) => listPoint.item.itemUid),
      );
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
    [setListPoints, setLoading],
  );

  const getListPointData = (index: number) => {
    const {
      item: { name, tags },
      unit,
      pointUid,
    } = listPoints[index];
    const selectedCount = selectedListPoints[pointUid] || 0;

    const itemTemplate = (
      <ListPointItemSelector
        listPointName={name}
        value={selectedCount > 0}
        key={index}
        onClick={() =>
          changeSelectedListPoints(
            pointUid,
            getSelectedListPointCount({ count: selectedCount, unit }),
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
