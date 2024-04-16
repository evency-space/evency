import { SERVER_URL } from "../../common/constants";

import { ICommonListPoint, IListPoint } from "../../interfaces";

const endPoint = (eventUid: string) => `${SERVER_URL}/CommonList/${eventUid}`;

export const commonListPointApi = ({
  eventUid,
  pointUid,
  pointName,
}: {
  eventUid: string;
  pointUid?: string;
  pointName?: string;
}) => ({
  addItem: `${endPoint(eventUid)}/AddItem`,
  editItem: `${endPoint(eventUid)}/EditItem/${pointUid || ""}`,
  getItems: `${endPoint(eventUid)}/GetList`,
  deleteItem: `${endPoint(eventUid)}/DeleteItem`,
  lockItem: `${endPoint(eventUid)}/Lock`,
  unlockItem: `${endPoint(eventUid)}/Unlock`,
  bindItem: `${endPoint(eventUid)}/Bind`,
  unbindItem: `${endPoint(eventUid)}/Unbind`,
  getMemberBindings: `${endPoint(eventUid)}/GetMemberBindings/${
    pointUid || ""
  }`,
  getDuplicateListPoints: `${endPoint(eventUid)}/Duplicates?item_name=${
    pointName || ""
  }`,
});

export const getCommonListPoints = ({
  eventUid,
  memberUid,
}: {
  eventUid: string;
  memberUid: string;
}) =>
  fetch(commonListPointApi({ eventUid }).getItems, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      memberUid,
    }),
  });

export const editCommonListPoint = ({
  mode,
  eventUid,
  memberUid,
  listPoint,
}: {
  mode: "add" | "edit";
  eventUid: string;
  memberUid?: string;
  listPoint: IListPoint;
}) =>
  fetch(
    commonListPointApi({ eventUid, pointUid: listPoint.pointUid })[
      mode === "add" ? "addItem" : "editItem"
    ],
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        point: listPoint,
        memberUid,
      }),
    },
  );

export const deleteCommonListPoint = ({
  eventUid,
  memberUid,
  pointUid,
}: {
  eventUid: string;
  memberUid: string;
  pointUid: IListPoint["pointUid"];
}) =>
  fetch(commonListPointApi({ eventUid }).deleteItem, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pointUid,
      memberUid,
    }),
  });

export const lockCommonListPoint = ({
  eventUid,
  memberUid,
  pointUid,
}: {
  eventUid: string;
  memberUid: string;
  pointUid: IListPoint["pointUid"];
}) =>
  fetch(commonListPointApi({ eventUid }).lockItem, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pointUid,
      memberUid,
    }),
  });

export const unlockCommonListPoint = ({
  eventUid,
  memberUid,
  pointUid,
}: {
  eventUid: string;
  memberUid: string;
  pointUid: IListPoint["pointUid"];
}) =>
  fetch(commonListPointApi({ eventUid }).unlockItem, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pointUid,
      memberUid,
    }),
  });

export const changeCommonListPointBindStatus = ({
  eventUid,
  memberUid,
  pointUid,
  count,
}: {
  eventUid: string;
  memberUid: string;
  pointUid: IListPoint["pointUid"];
  count?: number;
}) =>
  fetch(commonListPointApi({ eventUid })[count ? "bindItem" : "unbindItem"], {
    method: count ? "POST" : "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count,
      pointUid,
      memberUid,
    }),
  }).then(response => response.json() as Promise<ICommonListPoint>);

export const getMemberBindings = ({
  eventUid,
  pointUid,
}: {
  eventUid: string;
  pointUid: IListPoint["pointUid"];
}) =>
  fetch(commonListPointApi({ eventUid, pointUid }).getMemberBindings, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => response.json() as Promise<ICommonListPoint>);

export const getDuplicateListPoints = async ({
  eventUid,
  pointName,
}: {
  eventUid: string;
  pointName: IListPoint["item"]["name"];
}) => {
  let data: IListPoint[] = [];

  try {
    const response = await fetch(
      commonListPointApi({ eventUid, pointName }).getDuplicateListPoints,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      data = (await response.json()) as IListPoint[];
    }
  } catch (e) {
    console.error(e);
  }

  return data;
};
