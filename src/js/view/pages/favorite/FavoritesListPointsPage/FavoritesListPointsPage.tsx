import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLoading, useModal } from "../../../../hooks";
import {
  IFavoriteListPoint,
  IListPoint,
  LIST_POINT_CATEGORIES,
} from "../../../../interfaces";
import { RemoveListItemModal, TitleH1 } from "../../../elements";
import {
  getFavoriteListPoints,
  removeFavoriteListPoint,
} from "../../../../api_clients";
import {
  getFavoritesIdsFromLocalStorage,
  saveCurrentListPointInLocalStorage,
  saveFavoritesListPointsUidsInLocalStorage,
} from "../../../../utils/localStorage";
import { ListPointsWrapper, BaseListPointItem } from "../../../components";
import { getEmptyListPointWithCurrentCategory } from "../../../components/Items/utils";
import {
  createFavoriteListPointPageUrl,
  editFavoriteListPointPageUrl,
} from "../../../../../router/constants";
import { convertListPointToIEditListPoint } from "../../../../utils";

export const FavoritesListPointsPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [listPoints, setListPoints] = useState<IFavoriteListPoint[]>([]);

  const { setLoading } = useLoading();

  const modalContext = useModal();

  const getEmptyFavoriteListPoint = (
    category: LIST_POINT_CATEGORIES | undefined,
  ): IFavoriteListPoint => {
    const { item, unit } = getEmptyListPointWithCurrentCategory(category);

    return {
      item,
      unit,
      pointUid: "",
    };
  };

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
  }, [setLoading]);

  const goToListPointEditPage = (
    listPoint: IListPoint | IFavoriteListPoint,
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
      },
    );
  };

  const removeListPoint = async (listPoint: IFavoriteListPoint) => {
    try {
      setLoading(true);

      if (listPoint.item.itemUid) {
        await removeFavoriteListPoint({ listPoint });
        const localList = getFavoritesIdsFromLocalStorage();
        saveFavoritesListPointsUidsInLocalStorage(
          localList.filter((uid) => uid !== listPoint.item.itemUid),
        );
        await getListPoints();
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

    return {
      itemTemplate,
      tag: listPoint.item.tags[0],
      name: listPoint.item.name,
    };
  };

  const title = (
    <div className="flex flex-col mb-3">
      <TitleH1>{t("pages.favorites.title")}</TitleH1>
    </div>
  );

  useEffect(() => {
    if (listPoints.length === 0) {
      void getListPoints();
    }
  }, [getListPoints, listPoints.length]);

  return (
    <ListPointsWrapper
      title={title}
      listPoints={listPoints}
      getListPointData={getListPointData}
      onCreateListPoint={(category) =>
        goToListPointEditPage(getEmptyFavoriteListPoint(category))
      }
    />
  );
};
