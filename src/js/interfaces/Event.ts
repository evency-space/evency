export interface IEventFromBE {
  tripUid: string;
  title: string;
  description: string;
  start: string | null;
  end: string | null;
}

export interface IEvent extends Omit<IEventFromBE, "tripUid"> {
  eventUid: string;
  isNewEvent?: boolean;
}
