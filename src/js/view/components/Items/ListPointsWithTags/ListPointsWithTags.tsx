import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IListPointData,
  IListPointsWithTagsProps,
  TGroupedListPoints,
  TUnknownListPoint,
} from "./ListPointsWithTagsProps";
import { TagsGroup, TextBodyStandard, TitleH1 } from "../../../elements";
import ShutterStock from "../../../../../assets/images/shutterstock.png";
import SearchBar from "../../SearchBar/SearchBar";
import { LIST_POINT_CATEGORIES } from "../../../../interfaces";
import { ListPointsCategoryTitle } from "../ListPointsCategoryTitle/ListPointsCategoryTitle";

export const ListPointsWithTags = (props: IListPointsWithTagsProps) => {
  const {
    tags = [],
    listPoints,
    getListPointData,
    onCreateListPoint,
    title,
  } = props;

  const { t } = useTranslation();

  const [filter, setFilter] = useState<string>("");

  const [tagsFilter, setTagsFilter] = useState<string[]>([]);

  const tagsFilterSortedString = tagsFilter
    .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
    .join();

  const [groupedListPoints, setGroupedListPoints] =
    useState<TGroupedListPoints>({});

  const [groupedListPointsAfterFilter, setGroupedListPointsAfterFilter] =
    useState<TGroupedListPoints>();

  const [filteredListPointsQuantity, setFilteredListPointsQuantity] =
    useState<number>(listPoints.length);

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

  const searchBarFilterFn = useCallback(
    (listPointData: IListPointData) =>
      listPointData.name?.toLowerCase().indexOf(filter.toLowerCase()) !== -1,
    [filter]
  );

  const tagsFilterFn = useCallback(
    (listPointData: IListPointData) => {
      const tagsSortedString = listPointData.tags
        .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
        .join();
      return tagsSortedString.indexOf(tagsFilterSortedString) !== -1;
    },
    [tagsFilterSortedString]
  );

  const applyFilter = useCallback(() => {
    let filteredQuantity = listPoints.length;

    if (filter || tagsFilter.length > 0) {
      let grouped = {};

      const filteredList = listPoints.reduce(
        (
          filteredListPoints: TUnknownListPoint[],
          listPoint: TUnknownListPoint,
          index: number
        ) => {
          const listPointData = getListPointData(index);

          if (searchBarFilterFn(listPointData) && tagsFilterFn(listPointData)) {
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
      filteredQuantity = filteredList.length;
      setGroupedListPointsAfterFilter(grouped);
    } else {
      setGroupedListPointsAfterFilter(groupedListPoints);
    }

    setFilteredListPointsQuantity(filteredQuantity);
  }, [
    filter,
    getListPointData,
    groupedListPoints,
    listPoints,
    searchBarFilterFn,
    tagsFilter.length,
    tagsFilterFn,
  ]);

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

  const searchBarContent = (
    <SearchBar
      onChange={(value) => setFilter(value ?? "")}
      placeholder={t("search")}
    />
  );

  const titleContent = (
    <TitleH1>
      {title +
        (filteredListPointsQuantity > 0
          ? ` (${filteredListPointsQuantity})`
          : "")}
    </TitleH1>
  );

  const tagsFilterContent = (
    <TagsGroup
      tags={tags}
      activeTags={tagsFilter}
      size="s"
      onClick={(tagName) => {
        if (tagsFilter.findIndex((tag) => tag === tagName) !== -1) {
          setTagsFilter(tagsFilter.filter((tag) => tag !== tagName));
        } else {
          setTagsFilter([...tagsFilter, tagName]);
        }
      }}
    />
  );

  const listContent = (
    <div className="flex flex-col gap-y-6">
      {groupedListPointsAfterFilter &&
        (
          Object.keys(groupedListPointsAfterFilter) as LIST_POINT_CATEGORIES[]
        ).map((groupName) => (
          <div key={groupName}>
            <ListPointsCategoryTitle
              categoryTitle={groupName}
              onCreateListPoint={onCreateListPoint}
            />
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
  );

  useEffect(() => {
    if (listPoints.length > 0) {
      initializeGroupedListPoints(listPoints);
    }
  }, [initializeGroupedListPoints, listPoints]);

  useEffect(() => {
    applyFilter();
  }, [filter, tagsFilter, applyFilter, tags]);

  return (
    <div className="flex flex-col h-full w-full gap-4">
      {titleContent}
      {searchBarContent}
      {tagsFilterContent}
      {listPoints.length > 0 ? listContent : noContent}
    </div>
  );
};
