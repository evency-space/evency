import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ListPointsWrapperWithTags } from "../../../components/Items/ListPointsWrapperWithTags/ListPointsWrapperWithTags";
import { useLoading, useModal } from "../../../../hooks";
import {
  IFavoriteListPoint,
  IListPoint,
  LIST_POINT_CATEGORIES,
} from "../../../../interfaces";
import { RemoveListItemModal } from "../../../elements";
import { getTags, removeFavoriteListPoint } from "../../../../api_clients";
import {
  getFavoritesListUidFromLocalStorage,
  saveCurrentListPointInLocalStorage,
} from "../../../../utils/localStorage";
import { BaseListPointItem } from "../../../components";
import { getEmptyListPointWithCurrentCategory } from "../../../components/Items/utils";
import {
  createFavoriteListPointPageUrl,
  editFavoriteListPointPageUrl,
} from "../../../../../router/constants";
import { convertListPointToIEditListPoint } from "../../../../utils";
import { getFavoritesListPointsWithBridge } from "../../../../api_clients/listPoint/favoriteListPoint/utils";

export const FavoritesListPointsPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [listPoints, setListPoints] = useState<IFavoriteListPoint[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  const { setLoading } = useLoading();

  const modalContext = useModal();

  const getEmptyFavoriteListPoint = (
    category: LIST_POINT_CATEGORIES | undefined
  ): IFavoriteListPoint => {
    const { item, unit } = getEmptyListPointWithCurrentCategory(category);

    return {
      item,
      unit,
      pointUid: "",
    };
  };

  const getAllTags = useCallback(async () => {
    try {
      const list = await getTags({
        listUid: getFavoritesListUidFromLocalStorage() || "",
      });

      if (list) {
        setAllTags(list);
      }
    } catch (e) {
      console.error(e);
    }

    return Promise.resolve();
  }, []);

  const getListPoints = useCallback(async () => {
    try {
      const list = await getFavoritesListPointsWithBridge();

      if (list) {
        setListPoints(list);
      }
    } catch (e) {
      console.error(e);
    }

    return Promise.resolve();
  }, []);

  const initilalizeListPoints = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.allSettled([getAllTags(), getListPoints()]);
    } finally {
      setLoading(false);
    }
  }, [setLoading, getListPoints, getAllTags]);

  const goToListPointEditPage = (
    listPoint: IListPoint | IFavoriteListPoint
  ) => {
    const currentListPoint = convertListPointToIEditListPoint({
      point: listPoint,
      pointType: "favorite",
    });

    saveCurrentListPointInLocalStorage(currentListPoint);
    navigate(
      listPoint.item.itemUid
        ? editFavoriteListPointPageUrl({
            listPointUid: listPoint.item.itemUid,
          })
        : createFavoriteListPointPageUrl(),
      {
        state: {
          listPointType: "favorite",
          listPointUid: listPoint.item.itemUid,
        },
      }
    );
  };

  const removeListPoint = async (listPoint: IFavoriteListPoint) => {
    try {
      setLoading(true);

      if (listPoint.item.itemUid) {
        await removeFavoriteListPoint({ listPoint });
        await initilalizeListPoints();
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    modalContext.setContent(undefined);
  };

  const showRemoveListPointModal = (listPoint: IFavoriteListPoint) =>
    modalContext.setContent({
      content: (
        <RemoveListItemModal
          title={t("modals.remove_list_point.title", {
            listPointName: listPoint.item.name,
          })}
          onRemoveClick={() => {
            closeModal();
            void removeListPoint(listPoint);
          }}
          onCancelClick={closeModal}
        />
      ),
      onClose: closeModal,
    });

  const getListPointData = (index: number) => {
    const listPoint = listPoints[index];
    const itemTemplate = listPoint && (
      <BaseListPointItem
        name={listPoint.item.name}
        unit={listPoint.unit}
        key={index}
        onEdit={() => goToListPointEditPage(listPoint)}
        onRemove={() => showRemoveListPointModal(listPoint)}
      />
    );

    const [tag, ...tags] = listPoint.item.tags;

    return {
      itemTemplate,
      tag,
      name: listPoint.item.name,
      tags,
    };
  };

  useEffect(() => {
    if (listPoints.length === 0) {
      void initilalizeListPoints();
    }
  }, [listPoints.length, initilalizeListPoints]);

  return (
    <ListPointsWrapperWithTags
      title={t("pages.favorites.title")}
      listPoints={listPoints}
      getListPointData={getListPointData}
      tags={allTags}
      onCreateListPoint={(category) =>
        goToListPointEditPage(getEmptyFavoriteListPoint(category))
      }
    />
  );
};
