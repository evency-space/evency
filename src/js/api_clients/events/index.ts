import { SERVER_URL } from "../../common/constants";
import { IEvent, IEventFromBE, IFavoriteListPoint } from "../../interfaces";
import { convertIEventFromBEToIEvent } from "../../utils";

const endPoint = (eventUid: string) => `${SERVER_URL}/Trip/${eventUid}`;

export const eventsApi = ({
  eventUid,
  memberUid,
}: {
  eventUid: string;
  memberUid?: string;
}) => ({
  delete: endPoint(eventUid),
  getCombinedList: `${endPoint(eventUid)}/GetCombinedList?member_uid=${memberUid || ""}`,
});

export const getEvent = async ({ eventUid }: { eventUid: string }) => {
  let data: null | IEvent = null;

  try {
    const response = await fetch(endPoint(eventUid), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = convertIEventFromBEToIEvent((await response.json()) as IEventFromBE);
  } catch (e) {
    console.error(e);
  }

  return data;
};

export const getEvents = async ({ eventsUids }: { eventsUids: string[] }) => {
  let data: null | IEvent[] = null;

  try {
    const response = await fetch(`${SERVER_URL}/Trip/All?`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventsUids),
    });

    if (response.ok) {
      data = ((await response.json()) as IEventFromBE[]).map(e =>
        convertIEventFromBEToIEvent(e),
      );
    }
  } catch (e) {
    console.error(e);
  }

  return data;
};

export const deleteEvent = async ({ eventUid }: { eventUid: string }) => {
  try {
    await fetch(endPoint(eventUid), {
      method: "DELETE",
    });
  } catch (e) {
    console.error(e);
  }
};

export const getCombinedList = ({
  eventUid,
  memberUid,
}: {
  eventUid: string;
  memberUid: string;
}) =>
  fetch(eventsApi({ eventUid, memberUid }).getCombinedList, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => response.json() as Promise<IFavoriteListPoint[]>);
