import { IAccessIdsFromBE, IAccessIds } from "../../interfaces";

export const convertIAccessIdsFromBEToIAccessIds = (
  accessIds: IAccessIdsFromBE,
): IAccessIds => ({
  eventUid: accessIds.tripUid,
  memberUid: accessIds.memberUid,
});
