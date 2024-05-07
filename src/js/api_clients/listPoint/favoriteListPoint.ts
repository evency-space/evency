import { SERVER_URL } from "../../common/constants";

import { IFavoriteListPoint } from "../../interfaces";

const endPointFabric = () => `${SERVER_URL}/Favorites`;
const endPoint = endPointFabric();

export const favoritesListPointApi = ({
  itemUid,
}: {
  itemUid?: string;
} = {}) => ({
  addItem: `${endPoint}/AddItems`,
  editItem: `${endPoint}/EditItem/${itemUid || ""}`,
  getItems: `${endPoint}/`,
  removeItem: `${endPoint}/${itemUid || ""}`,
  insertItems: `${endPoint}/InsertItems`,
});

export const getFavoriteListPoints = ({ itemUids }: { itemUids: string[] }) =>
  fetch(favoritesListPointApi().getItems, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemUids),
  }).then(response => response.json());

export const editFavoriteListPoint = ({
  mode,
  listPoint,
}: {
  mode: "add" | "edit";
  listPoint: IFavoriteListPoint;
}) => {
  const action = mode === "add" ? "addItem" : "editItem";
  return fetch(
    favoritesListPointApi({ itemUid: listPoint.item.itemUid })[action],
    {
      method: mode === "add" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mode === "add" ? [listPoint] : listPoint),
    },
  ).then(response => response.json());
};

export const removeFavoriteListPoint = ({
  listPoint,
}: {
  listPoint: IFavoriteListPoint;
}) =>
  fetch(favoritesListPointApi({ itemUid: listPoint.item.itemUid }).removeItem, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const insertFavoriteListPoints = ({
  itemUids,
}: {
  itemUids: string[];
}) =>
  fetch(favoritesListPointApi().insertItems, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemUids),
  });
