import { IEvent, IEventFromBE } from "../../interfaces";
import { convertDateToISO8601 } from "../date";

export const convertIEventFromBEToIEvent = (event: IEventFromBE): IEvent => ({
  ...event,
  eventUid: event.tripUid,
  isNewEvent: false,
});

export const convertIEventToIEventFromBE = (event: IEvent): IEventFromBE => ({
  ...event,
  tripUid: event.eventUid,
  start: convertDateToISO8601(event.start || ""),
  end: convertDateToISO8601(event.end || ""),
});
