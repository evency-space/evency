import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IImportedFavoritesListProps } from "./ImportedFavoritesListProps";
import { useLoading } from "../../../../../hooks";
import { getFavoritesIdsFromLocalStorage } from "../../../../../utils/localStorage";
import { getFavoriteListPoints } from "../../../../../api_clients";
import {
  IFavoriteListPoint,
  LIST_POINT_UNITS,
} from "../../../../../interfaces";
import { TwoLinesListPointItem } from "../../../../components/Items/TwoLinesListPointItem/TwoLinesListPointItem";
import { Checkbox } from "../../../../elements/inputs/Checkbox/Checkbox";
import { LIST_POINT_UNITS_STEP } from "../../../../elements/Forms/ListPointEditForm/ListPointEditFormProps";

import { ListPoints } from "../../../../components/Items/ListPoints/ListPoints";
import { TextBodyStandard } from "../../../../elements";

export const ImportedFavoritesList = (props: IImportedFavoritesListProps) => {
  const { selectedListPoints, onChangeSelectedListPoints } = props;

  const { t } = useTranslation();

  const { setLoading } = useLoading();

  const [listPoints, setListPoints] = useState<IFavoriteListPoint[]>([]);

  const getIncrementedCount = ({
    count = 0,
    unit,
  }: {
    count?: number;
    unit: keyof typeof LIST_POINT_UNITS;
  }) => count + LIST_POINT_UNITS_STEP[unit];

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
    let points = { ...selectedListPoints };

    if (!key) {
      const selected = Object.values(selectedListPoints);

      if (selected.length === listPoints.length) {
        points = {};
      } else {
        listPoints.forEach(({ item, unit }) => {
          points[item.itemUid] = getIncrementedCount({ unit });
        });
      }
    } else if (count === 0) {
      delete points[key];
    } else {
      points[key] = count;
    }

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
    const newCount = count === 0 ? getIncrementedCount({ count, unit }) : 0;
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
