import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IImportedFavoritesListProps } from "./ImportedFavoritesListProps";
import { useLoading } from "../../../../../hooks";
import { getFavoritesIdsFromLocalStorage } from "../../../../../utils/localStorage";
import { getFavoriteListPoints } from "../../../../../api_clients";
import { IFavoriteListPoint } from "../../../../../interfaces";
import { TwoLinesListPointItem } from "../../../../components/Items/TwoLinesListPointItem/TwoLinesListPointItem";
import { Checkbox } from "../../../../elements/inputs/Checkbox/Checkbox";

import { ListPoints } from "../../../../components/Items/ListPoints/ListPoints";
import { TextBodyStandard } from "../../../../elements";
import {
  getSelectedListPointCount,
  getUpdatedSelectedListPoints,
} from "../../utils";

export const ImportedFavoritesList = (props: IImportedFavoritesListProps) => {
  const { selectedListPoints, onChangeSelectedListPoints } = props;

  const { t } = useTranslation();

  const { setLoading } = useLoading();

  const [listPoints, setListPoints] = useState<IFavoriteListPoint[]>([]);

  const getListPoints = useCallback(async () => {
    try {
      setLoading(true);

      const itemUids = getFavoritesIdsFromLocalStorage();
      const list = (await getFavoriteListPoints({
        itemUids,
      })) as IFavoriteListPoint[];

      setListPoints(list);
    } finally {
      setLoading(false);
    }
  }, [setListPoints, setLoading]);

  const changeSelectedListPoints = (key?: string, count = 0) => {
    const points = getUpdatedSelectedListPoints({
      listPoints,
      selectedListPoints,
      key,
      count,
    });

    onChangeSelectedListPoints(points);
  };

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

  const handleCheckboxItemClick = ({
    listPoint: {
      unit,
      item: { itemUid },
    },
    count,
  }: {
    listPoint: IFavoriteListPoint;
    count: number;
  }) => {
    const newCount = getSelectedListPointCount({ count, unit });
    changeSelectedListPoints(itemUid, newCount);
  };

  const getListPointCheckbox = ({
    listPoint,
    count,
  }: {
    listPoint: IFavoriteListPoint;
    count: number;
  }) => (
    <Checkbox
      value={count > 0}
      onChange={() => handleCheckboxItemClick({ listPoint, count })}
    />
  );

  const getListPointData = (index: number) => {
    const listPoint = listPoints[index];
    const selectedCount = selectedListPoints[listPoint.item.itemUid] || 0;

    const itemTemplate = (
      <TwoLinesListPointItem
        isButton
        listPointName={listPoint.item.name}
        unit={listPoint.unit}
        count={0}
        key={index}
        countItemTaken={0}
        memberCountItemTaken={selectedCount}
        prependContent={getListPointCheckbox({
          listPoint,
          count: selectedCount,
        })}
        onBindListPoint={(value) =>
          changeSelectedListPoints(listPoint.item.itemUid, value)
        }
        onClickTitle={() =>
          handleCheckboxItemClick({ listPoint, count: selectedCount })
        }
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
    <ListPoints
      listPoints={listPoints}
      getListPointData={getListPointData}
      contentBeforeList={getToggleAllCheckbox()}
      disableCategoryAddButton
    />
  );
};
