export interface IAccessIdsFromBE {
  tripUid: string;
  memberUid: string;
}

export interface IAccessIds extends Omit<IAccessIdsFromBE, "tripUid"> {
  eventUid: string;
  memberName?: string;
}
