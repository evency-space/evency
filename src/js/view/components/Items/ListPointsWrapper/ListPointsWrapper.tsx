import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IListPointData,
  IListPointsWrapperProps,
  TGroupedListPoints,
  TUnknownListPoint,
} from "./ListPointsWrapperProps";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import {
  ActionPanel,
  ButtonTransparent,
  TextBodyStandard,
  TitleH1,
} from "../../../elements";
import ShutterStock from "../../../../../assets/images/shutterstock.png";
import { useLoading } from "../../../../hooks";
import SearchBar from "../../SearchBar/SearchBar";
import { LIST_POINT_CATEGORIES } from "../../../../interfaces";

export const ListPointsWrapper = (props: IListPointsWrapperProps) => {
  const {
    listPoints,
    getListPointData,
    customActionPanel,
    onCreateListPoint,
    title,
    disableCategoryAddButton = false,
  } = props;

  const { t } = useTranslation();

  const { loading } = useLoading();

  const [groupedListPoints, setGroupedListPoints] =
    useState<TGroupedListPoints>({});

  const [groupedListPointsAfterFilter, setGroupedListPointsAfterFilter] =
    useState<TGroupedListPoints>();

  const updateGroupedListPoints = ({
    grouped,
    listPointData,
  }: {
    grouped: TGroupedListPoints;
    listPointData: IListPointData;
  }) => {
    const { tag } = listPointData;
    const list = grouped[tag];

    if (Array.isArray(list)) {
      return { ...grouped, [tag]: [...list, listPointData] };
    }
    return { ...grouped, [tag]: [listPointData] };
  };

  const applyFilter = (value?: string) => {
    if (value) {
      let grouped = {};

      listPoints.reduce(
        (
          filteredListPoints: TUnknownListPoint[],
          listPoint: TUnknownListPoint,
          index: number
        ) => {
          const listPointData = getListPointData(index);
          const itemName = listPointData.name.toLowerCase();

          if (itemName.indexOf(value.toLowerCase()) !== -1) {
            filteredListPoints.push(listPoint);
            grouped = updateGroupedListPoints({
              grouped,
              listPointData,
            });
          }

          return filteredListPoints;
        },
        []
      );
      setGroupedListPointsAfterFilter(grouped);
    } else {
      setGroupedListPointsAfterFilter(groupedListPoints);
    }
  };

  const initializeGroupedListPoints = useCallback(
    (list: TUnknownListPoint[]) => {
      let grouped: TGroupedListPoints = {};

      list.forEach((_, index: number) => {
        grouped = updateGroupedListPoints({
          grouped,
          listPointData: getListPointData(index),
        });
      });
      setGroupedListPoints(grouped);
      setGroupedListPointsAfterFilter(grouped);
    },
    [getListPointData]
  );

  const noContent = (
    <div className="flex flex-col h-full items-center justify-center gap-y-6">
      <img
        src={ShutterStock}
        srcSet={`${ShutterStock} 1x, ${ShutterStock} 2x`}
        alt={t("pages.share.logo")}
        className="w-[200px] mb-8"
      />
      <TitleH1>{t("list_point.empty_list.title")}</TitleH1>
      <TextBodyStandard>{t("list_point.empty_list.action")}</TextBodyStandard>
    </div>
  );

  const listContent = (
    <div className="flex flex-col">
      <SearchBar onChange={applyFilter} placeholder={t("search")} />
      <div>
        {groupedListPointsAfterFilter &&
          (
            Object.keys(groupedListPointsAfterFilter) as LIST_POINT_CATEGORIES[]
          ).map((groupName) => (
            <div key={groupName}>
              <div className="flex mb-4 mt-6 items-center justify-between">
                <TextBodyStandard className="text-dark-2">
                  {t(`list_point.categories.${groupName}`)}
                </TextBodyStandard>

                {!disableCategoryAddButton && (
                  <ButtonTransparent
                    className="btn-xs"
                    onClick={() => onCreateListPoint?.(groupName)}
                  >
                    {`+ ${t("buttons.add")}`}
                  </ButtonTransparent>
                )}
              </div>

              <div className="-mr-4 -ml-4">
                {groupedListPointsAfterFilter[groupName]?.map(
                  ({ itemTemplate }) => (
                    <div
                      key={itemTemplate.key}
                      className="flex flex-col w-full zebra-list-item px-4"
                    >
                      {itemTemplate}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const pageMainContent = !loading ? (
    <div className="flex flex-col h-full w-full">
      {title}
      {listPoints.length > 0 ? listContent : noContent}
    </div>
  ) : (
    <div />
  );

  const pageFooter = (
    <ActionPanel
      primaryButtonText={t("list_point.add_item")}
      onPrimaryButtonClick={() => onCreateListPoint?.()}
    />
  );

  useEffect(() => {
    if (listPoints.length > 0) {
      initializeGroupedListPoints(listPoints);
    }
  }, [initializeGroupedListPoints, listPoints]);

  return (
    <PageWrapper
      pageContent={pageMainContent}
      pageFooter={customActionPanel || pageFooter}
      verticalTopPageContent
    />
  );
};
