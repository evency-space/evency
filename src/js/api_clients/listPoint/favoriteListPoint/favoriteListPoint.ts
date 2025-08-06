import { SERVER_URL } from "../../../common/constants";

import { IFavoriteListPoint, IListPoint } from "../../../interfaces";

const endPointFabric = () => `${SERVER_URL}/v2/Favorites`;
const endPoint = endPointFabric();

export const favoritesListPointApi = ({
  itemUid = "",
  listUid = "",
}: {
  itemUid?: string;
  listUid?: string;
} = {}) => ({
  addItem: `${endPoint}/AddItems/${listUid}`,
  editItem: `${endPoint}/EditItem/${itemUid}`,
  getItems: `${endPoint}/${listUid}`,
  removeItem: `${endPoint}/${itemUid}`,
  insertItems: `${endPoint}/InsertItems/${listUid}`,
  getTags: `${endPoint}/${itemUid}/Tags`,
  createList: `${endPoint}/CreateList`,
  moveItems: `${endPoint}/MoveItems/${listUid}`,
});

export const getFavoriteListPoints = ({ listUid }: { listUid: string }) =>
  fetch(favoritesListPointApi({ listUid }).getItems, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => response.json()) as Promise<IFavoriteListPoint[]>;

export const addFavoritesListPoints = ({
  listUid,
  listPoints,
}: {
  listUid: string;
  listPoints: IListPoint[];
}) =>
  fetch(favoritesListPointApi({ listUid }).addItem, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listPoints),
  }).then(response => response.json() as Promise<IFavoriteListPoint[]>);

export const editFavoriteListPoint = ({
  listPoint,
}: {
  listPoint: IListPoint;
}) =>
  fetch(favoritesListPointApi({ itemUid: listPoint.item.itemUid }).editItem, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listPoint),
  });

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
  listUid,
  listPointsUids,
}: {
  listUid: string;
  listPointsUids: string[];
}) =>
  fetch(favoritesListPointApi({ listUid }).insertItems, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listPointsUids),
  }).then(response => response.json() as Promise<IFavoriteListPoint[]>);

export const createFavoriteList = () =>
  fetch(favoritesListPointApi().createList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "" }),
  }).then(response => response.json() as Promise<{ listUid: string }>);

export const moveFavoritesListPoints = ({
  listUid,
  listPointsUids,
}: {
  listUid: string;
  listPointsUids: string[];
}) =>
  fetch(favoritesListPointApi({ listUid }).moveItems, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listPointsUids),
  }).then(response => response.json() as Promise<IFavoriteListPoint[]>);
