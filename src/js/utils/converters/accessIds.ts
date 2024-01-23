import { IAccessIdsFromBE, IAccessIds } from "../../interfaces";

export const convertIAccessIdsFromBEToIAccessIds = (
  accessIds: IAccessIdsFromBE
): IAccessIds => ({
  eventUid: accessIds.trip_uid || accessIds.tripUid || "",
  memberUid: accessIds.member_uid || accessIds.memberUid || "",
});
