import { favoriteListPointsFromBE, accessIds } from "../../utils";
import { eventsApi } from "../events";

const status = 200;
const delay = 700;

const eventsEndPoints = eventsApi(accessIds);

export const mockedEventsApi = {
  getCombinedList: {
    url: eventsEndPoints.getCombinedList,
    method: "GET",
    status,
    response: favoriteListPointsFromBE,
    delay,
  },
};
