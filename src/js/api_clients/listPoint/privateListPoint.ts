import { SERVER_URL } from "../../common/constants";

import { IListPoint } from "../../interfaces";

const endPoint = (eventUid: string) => `${SERVER_URL}/PrivateList/${eventUid}`;

export const privateListPointApi = ({
  eventUid,
  pointUid,
  memberUid,
}: {
  eventUid: string;
  pointUid?: string;
  memberUid?: string;
}) => ({
  addItem: `${endPoint(eventUid)}/AddItem`,
  editItem: `${endPoint(eventUid)}/EditItem/${pointUid || ""}`,
  getItems: `${endPoint(eventUid)}/GetItems/${memberUid || ""}`,
  removeItem: `${endPoint(eventUid)}/DeleteItem`,
  addFromFavorites: `${endPoint(eventUid)}/AddFromFavorites`,
});

export const getPrivateListPoints = ({
  eventUid,
  memberUid,
}: {
  eventUid: string;
  memberUid: string;
}) =>
  fetch(privateListPointApi({ eventUid, memberUid }).getItems, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const editPrivateListPoint = ({
  mode,
  eventUid,
  memberUid,
  listPoint,
}: {
  mode: "add" | "edit";
  eventUid: string;
  memberUid?: string;
  listPoint: IListPoint;
}) => {
  const privateMethod = mode === "add" ? "addItem" : "editItem";
  return fetch(
    privateListPointApi({ eventUid, pointUid: listPoint.pointUid })[
      privateMethod
    ],
    {
      method: mode === "add" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        point: listPoint,
        memberUid,
      }),
    },
  );
};

export const removePrivateListPoint = ({
  eventUid,
  memberUid,
  pointUid,
}: {
  eventUid: string;
  memberUid: string;
  pointUid: string;
}) =>
  fetch(privateListPointApi({ eventUid }).removeItem, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      memberUid,
      pointUid,
    }),
  });

export const addPrivateItemsFromFavorites = ({
  eventUid,
  memberUid,
  items,
}: {
  eventUid: string;
  memberUid: string;
  items: Array<{ itemUid: string; count: number }>;
}) =>
  fetch(privateListPointApi({ eventUid }).addFromFavorites, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      memberUid,
      items,
    }),
  });
