import { favoriteListPointsFromBE } from "../../../utils";
import { favoritesListPointApi } from "../../listPoint";

const status = 200;
const delay = 700;

const favoritesEndPoints = favoritesListPointApi({
  itemUid: ":pointUid",
  listUid: ":listUid",
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
  getTags: {
    url: favoritesEndPoints.getTags,
    method: "GET",
    status,
    response: ["1", "2", "3"],
    delay,
  },
};
