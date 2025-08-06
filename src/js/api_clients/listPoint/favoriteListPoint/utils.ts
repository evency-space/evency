import {
  deleteFavoritesIdsFromLocalStorage,
  getFavoritesIdsFromLocalStorage,
  getFavoritesListUidFromLocalStorage,
  saveFavoritesListUidInLocalStorage,
} from "../../../utils/localStorage";
import {
  createFavoriteList,
  getFavoriteListPoints,
  moveFavoritesListPoints,
} from "./favoriteListPoint";

export const createFavoriteListFromOldList = async () => {
  let list;

  try {
    const favoritesUids = getFavoritesIdsFromLocalStorage();
    const { listUid } = await createFavoriteList();
    list = await moveFavoritesListPoints({
      listUid,
      listPointsUids: favoritesUids,
    });
    saveFavoritesListUidInLocalStorage(listUid || "");
    deleteFavoritesIdsFromLocalStorage();
  } catch (e) {
    console.error("create favorite list error");
  }

  return list;
};

export const getFavoritesListPointsWithBridge = async () => {
  const listUid = getFavoritesListUidFromLocalStorage();
  let list;

  if (!listUid) {
    list = await createFavoriteListFromOldList();
  } else {
    list = await getFavoriteListPoints({
      listUid,
    });
  }

  return list;
};
