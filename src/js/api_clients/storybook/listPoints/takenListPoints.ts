import { accessIds, untakenListPointFromBE } from "../../../utils";
import { takenListPointApi } from "../../listPoint";

const status = 200;
const delay = 700;

const takenEndPoints = takenListPointApi({
  ...accessIds,
  pointUid: ":pointUid",
});

export const mockedTakenListPointsApi = {
  getItems: {
    url: takenEndPoints.getItems,
    method: "GET",
    status,
    response: untakenListPointFromBE,
    delay,
  },
  takeItem: {
    url: takenEndPoints.takeItem,
    method: "PUT",
    status,
    response: {},
    delay,
  },
  untakeItem: {
    url: takenEndPoints.untakeItem,
    method: "PUT",
    status,
    response: {},
    delay,
  },
};
