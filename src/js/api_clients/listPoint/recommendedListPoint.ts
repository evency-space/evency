import { SERVER_URL } from "../../common/constants";
import { IListPoint } from "../../interfaces";

export const createRecommendedPrivateList = async (
  tripUid: string,
  body: IListPoint[],
) =>
  fetch(`${SERVER_URL}/Trip/${tripUid}/CreateRecommendedPrivateList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
