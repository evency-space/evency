import { SERVER_URL } from "../common/constants";
import { IMember } from "../interfaces";

export const getMembers = async (eventUid: string) => {
  const response = await fetch(`${SERVER_URL}/Trip/${eventUid}/Members`);
  if (response.ok) {
    const json = (await response.json()) as IMember[];
    return json;
  }
  return [];
};

export const deleteMember = async (
  eventUid: string,
  memberUid: string,
): Promise<void> => {
  await fetch(`${SERVER_URL}/Trip/${eventUid}/Members/${memberUid}`, {
    method: "DELETE",
  })
    .then(response => response.json())
    .catch(() => {});
};

export const renameMember = async (
  eventUid: string,
  memberUid: string,
  memberName: string,
): Promise<Response> => {
  const res = await fetch(
    `${SERVER_URL}/Trip/${eventUid}/Members/RenameMember`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: memberName,
        memberUid,
      }),
    },
  );
  return res;
};

export const addMember = async (
  eventUid: string,
  memberName: string,
): Promise<Response> => {
  const response = await fetch(
    `${SERVER_URL}/Trip/${eventUid}/Members/AddMember`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: memberName,
        memberUid: null,
      }),
    },
  );
  return response;
};
