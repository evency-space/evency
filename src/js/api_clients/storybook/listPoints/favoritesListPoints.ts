import { accessIds, favoriteListPointsFromBE } from "../../../utils";
import { favoritesListPointApi } from "../../listPoint";

const status = 200;
const delay = 700;

const favoritesEndPoints = favoritesListPointApi({
  ...accessIds,
  itemUid: ":pointUid",
});

export const mockedFavoritesListPointsApi = {
  getItems: {
    url: favoritesEndPoints.getItems,
    method: "POST",
    status,
    response: favoriteListPointsFromBE,
    delay,
  },
  insertItems: {
    url: favoritesEndPoints.insertItems,
    method: "POST",
    status,
    response: favoriteListPointsFromBE,
    delay,
  },
};
