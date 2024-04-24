import React, { useCallback, useEffect, useState } from "react";
import { TakenListPointItem } from "../TakenListPointItem/TakenListPointItem";
import { ListPointsWrapper } from "../../ListPointsWrapper/ListPointsWrapper";
import {
  getTakenListPoints,
  changeIsTakenStatus,
} from "../../../../../api_clients";
import { useLoading } from "../../../../../hooks";
import { IListPoint, ITakenListPoint } from "../../../../../interfaces";
import { ITakenListPointsProps } from "./TakenListPointsProps";

export const TakenListPoints = (props: ITakenListPointsProps) => {
  const { accessIds } = props;

  const [listPoints, setListPoints] = useState<ITakenListPoint[]>([]);

  const [items, setItems] = useState<IListPoint[]>([]);

  const { setLoading } = useLoading();

  const getListPoints = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getTakenListPoints(accessIds);
      const listPointsResponse = (await response.json()) as ITakenListPoint[];

      setListPoints(listPointsResponse);
      setItems(listPointsResponse.map((listPoint) => listPoint.point));
    } finally {
      setLoading(false);
    }
  }, [accessIds, setLoading]);

  const onChangeIsTakenStatus = (listPoint: ITakenListPoint) => {
    const index = listPoints.findIndex(
      (lp) => lp.pointUid === listPoint.pointUid,
    );

    if (index !== -1) {
      void changeIsTakenStatus({
        ...accessIds,
        isTaken: listPoint.isTaken,
        pointUid: listPoint.pointUid,
      });

      listPoints[index].isTaken = !listPoints[index].isTaken;
      setListPoints([...listPoints]);
    }
  };

  const getListPointData = (index: number) => {
    const listPoint = listPoints[index];
    const itemTemplate = listPoint && (
      <TakenListPointItem
        listPoint={listPoint}
        key={listPoint.pointUid}
        onCheck={() => {
          void onChangeIsTakenStatus(listPoint);
        }}
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
      listPoints={items}
      getListPointData={getListPointData}
      customActionPanel={<div />}
      disableCategoryAddButton
    />
  );
};
